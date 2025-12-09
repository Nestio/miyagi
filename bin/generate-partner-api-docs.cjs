const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

// Tag to folder name mapping (matches desired sidebar structure)
const TAG_MAPPING = {
  'Appointment Booking': 'appointment-booking',
  'Community Details': 'community-details',
  'Prospects': 'prospects',
  'Third Party VLA Handling': 'third-party-vla-handling',
  'Communications': 'communications',
  'Chat': 'chat',
  'Tasks': 'tasks',
  'Team': 'team',
  'Custom Scoring': 'customer-scoring', // Maps "Custom Scoring" to "customer-scoring"
  'Renewal Status': 'renewal-status',
  'ResidentApp': 'resident-app',
};

// Sidebar position mapping (controls order in sidebar)
const SIDEBAR_POSITIONS = {
  'appointment-booking': 20,
  'community-details': 30,
  'prospects': 40,
  'third-party-vla-handling': 50,
  'communications': 60,
  'chat': 70,
  'tasks': 80,
  'team': 90,
  'customer-scoring': 100,
  'renewal-status': 110,
  'resident-app': 120,
};

// Convert OpenAPI schema to AttributeItem format
function schemaToAttributes(schema, components = {}, visited = new Set()) {
  if (!schema || typeof schema !== 'object') {
    return [];
  }

  // Handle $ref
  if (schema.$ref) {
    const refPath = schema.$ref.replace('#/components/', '').split('/');
    let refSchema = components;
    for (const part of refPath) {
      refSchema = refSchema?.[part];
    }
    if (refSchema && !visited.has(schema.$ref)) {
      visited.add(schema.$ref);
      return schemaToAttributes(refSchema, components, visited);
    }
    return [];
  }

  // Handle allOf, anyOf, oneOf
  if (schema.allOf) {
    return schema.allOf.flatMap(s => schemaToAttributes(s, components, visited));
  }

  const attributes = [];

  // Handle object with properties
  if (schema.type === 'object' && schema.properties) {
    for (const [propName, propSchema] of Object.entries(schema.properties)) {
      const required = Array.isArray(schema.required) && schema.required.includes(propName);
      const attr = {
        name: propName,
        type: getTypeString(propSchema, components),
        description: propSchema.description || '',
        required,
        nullable: propSchema.nullable === true,
      };

      if (propSchema.example !== undefined) {
        attr.example = String(propSchema.example);
      }

      // Handle nested objects and arrays
      if (propSchema.type === 'object' && propSchema.properties) {
        attr.children = schemaToAttributes(propSchema, components, visited);
      } else if (propSchema.type === 'array' && propSchema.items) {
        if (propSchema.items.type === 'object' && propSchema.items.properties) {
          attr.children = schemaToAttributes(propSchema.items, components, visited);
        }
      } else if (propSchema.$ref) {
        const refPath = propSchema.$ref.replace('#/components/', '').split('/');
        let refSchema = components;
        for (const part of refPath) {
          refSchema = refSchema?.[part];
        }
        if (refSchema && refSchema.properties) {
          attr.children = schemaToAttributes(refSchema, components, visited);
        }
      }

      attributes.push(attr);
    }
  }

  return attributes;
}

// Get type string from schema
function getTypeString(schema, components) {
  if (schema.$ref) {
    const refPath = schema.$ref.replace('#/components/', '').split('/');
    const refName = refPath[refPath.length - 1];
    // Remove "Schema" suffix if present
    return refName.replace(/Schema$/, '');
  }

  if (schema.type === 'array') {
    const itemType = schema.items ? getTypeString(schema.items, components) : 'object';
    return `array<${itemType}>`;
  }

  if (schema.type) {
    return schema.type;
  }

  if (schema.enum) {
    return 'enum';
  }

  return 'object';
}

// Generate example JSON from schema
function generateExample(schema, components = {}, visited = new Set()) {
  if (!schema || typeof schema !== 'object') {
    return null;
  }

  // Handle $ref
  if (schema.$ref) {
    const refPath = schema.$ref.replace('#/components/', '').split('/');
    let refSchema = components;
    for (const part of refPath) {
      refSchema = refSchema?.[part];
    }
    if (refSchema && !visited.has(schema.$ref)) {
      visited.add(schema.$ref);
      return generateExample(refSchema, components, visited);
    }
    return null;
  }

  // Handle allOf
  if (schema.allOf) {
    const merged = {};
    for (const s of schema.allOf) {
      const example = generateExample(s, components, visited);
      if (example && typeof example === 'object') {
        Object.assign(merged, example);
      }
    }
    return Object.keys(merged).length > 0 ? merged : null;
  }

  // Handle array
  if (schema.type === 'array') {
    if (schema.items) {
      const itemExample = generateExample(schema.items, components, visited);
      return itemExample !== null ? [itemExample] : [];
    }
    return [];
  }

  // Handle object
  if (schema.type === 'object' || schema.properties) {
    const example = {};
    const props = schema.properties || {};
    for (const [propName, propSchema] of Object.entries(props)) {
      if (propSchema.example !== undefined) {
        example[propName] = propSchema.example;
      } else if (propSchema.type === 'object' || propSchema.$ref) {
        const nested = generateExample(propSchema, components, visited);
        if (nested !== null) {
          example[propName] = nested;
        }
      } else if (propSchema.type === 'array') {
        const itemExample = generateExample(propSchema.items, components, visited);
        example[propName] = itemExample !== null ? [itemExample] : [];
      } else {
        // Generate simple example based on type
        switch (propSchema.type) {
          case 'string':
            example[propName] = propSchema.format === 'date' ? '2023-01-01' : 'string';
            break;
          case 'integer':
          case 'number':
            example[propName] = 0;
            break;
          case 'boolean':
            example[propName] = false;
            break;
          default:
            example[propName] = null;
        }
      }
    }
    return Object.keys(example).length > 0 ? example : null;
  }

  // Handle primitive types
  if (schema.example !== undefined) {
    return schema.example;
  }

  return null;
}

// Convert path parameters to :param format
function formatPath(path) {
  return path.replace(/\{([^}]+)\}/g, ':$1');
}

// Generate MDX content for an endpoint
function generateEndpointMDX(endpoint, spec) {
  const { method, path: endpointPath, operation, tag } = endpoint;
  const components = spec.components || {};

  // Generate a more descriptive title, using path to differentiate duplicates
  let title = operation.summary || `${method.toUpperCase()} ${endpointPath}`;
  
  // Handle duplicate "Book an appointment" titles
  if (title === 'Book an appointment') {
    // Check for the renter-specific endpoint first (more specific)
    if (endpointPath.includes('/renters/') && endpointPath.includes('/appointment/')) {
      title = 'Book an appointment (for existing renter)';
    } else if (endpointPath.endsWith('/appointments/') || endpointPath.includes('/appointments/')) {
      title = 'Book an appointment (with prospect)';
    }
  }
  
  const description = operation.description || operation.summary || '';
  const methodUpper = method.toUpperCase();

  // Get request body schema
  let requestAttributes = [];
  let requestExample = null;
  if (operation.requestBody) {
    const content = operation.requestBody.content || {};
    const jsonContent = content['application/json'];
    if (jsonContent && jsonContent.schema) {
      requestAttributes = schemaToAttributes(jsonContent.schema, components);
      requestExample = generateExample(jsonContent.schema, components);
    }
  }

  // Get query parameters
  const parameters = operation.parameters || [];
  const queryParams = parameters.filter(p => p.in === 'query');

  // Add query parameters to request attributes if present
  if (queryParams.length > 0 && requestAttributes.length === 0) {
    requestAttributes = queryParams.map(param => {
      // Resolve $ref in parameter schema
      let paramSchema = param.schema || {};
      if (param.$ref) {
        const refPath = param.$ref.replace('#/components/', '').split('/');
        let refSchema = components;
        for (const part of refPath) {
          refSchema = refSchema?.[part];
        }
        if (refSchema) {
          paramSchema = refSchema.schema || refSchema;
        }
      }
      return {
        name: param.name,
        type: getTypeString(paramSchema, components),
        description: param.description || '',
        required: param.required === true,
        nullable: paramSchema?.nullable === true,
      };
    });
  }

  // Get response schema
  let responseAttributes = [];
  let responseExample = null;
  const successResponse = operation.responses?.['200'] || operation.responses?.['201'];
  if (successResponse) {
    const content = successResponse.content || {};
    const jsonContent = content['application/json'];
    if (jsonContent && jsonContent.schema) {
      responseAttributes = schemaToAttributes(jsonContent.schema, components);
      responseExample = generateExample(jsonContent.schema, components);
    }
  }

  // Generate file-safe name
  const safeTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Determine sidebar position based on tag and endpoint order
  const folderName = TAG_MAPPING[tag] || tag.toLowerCase().replace(/\s+/g, '-');
  const basePosition = SIDEBAR_POSITIONS[folderName] || 1000;
  const sidebarPosition = basePosition + (endpoint.index || 0);

  // Format example code
  const formatExample = (example) => {
    if (example === null || example === undefined) {
      return '{}';
    }
    return JSON.stringify(example, null, 2);
  };

  const requestExampleCode = requestExample ? formatExample(requestExample) : '{}';
  const responseExampleCode = responseExample ? formatExample(responseExample) : '{}';

  // Generate MDX content
  const mdxContent = `---
title: ${title}
sidebar_label: ${title}
sidebar_position: ${sidebarPosition}
hide_table_of_contents: true
---

# ${title}

{/* Define attributes and code as variables */}
{(() => {
  const requestAttributes = ${JSON.stringify(requestAttributes, null, 2)};

  const responseAttributes = ${JSON.stringify(responseAttributes, null, 2)};

  const requestExampleCode = ${JSON.stringify(requestExampleCode)};

  const responseExampleCode = ${JSON.stringify(responseExampleCode)};

  return (
    <ApiPage
      title="${title}"
      description="${description.replace(/"/g, '\\"').replace(/\n/g, ' ')}"
      method="${methodUpper}"
      path="${formatPath(endpointPath)}"
      requestAttributes={requestAttributes.length > 0 ? requestAttributes : undefined}
      requestExampleCode={requestAttributes.length > 0 ? requestExampleCode : undefined}
      requestExampleTitle="Example request"
      requestMethod="${methodUpper}"
      requestPath="${formatPath(endpointPath)}"
      attributes={responseAttributes}
      exampleCode={responseExampleCode}
      exampleTitle="Example response"
      exampleLang="json"
    />
  );
})()}
`;

  return { safeTitle, mdxContent, folderName, sidebarPosition };
}

// Main generation function
function generateDocs() {
  // Resolve paths relative to miyagi root
  // __dirname is bin/, so .. gives miyagi root
  const miyagiRoot = path.resolve(__dirname, '..');
  const yamlPath = path.resolve(miyagiRoot, 'schemas', 'partner-api.yaml');
  const outputDir = path.resolve(miyagiRoot, 'docs', 'apis', 'partner-api');

  console.log('Reading OpenAPI spec...');
  const spec = yaml.load(fs.readFileSync(yamlPath, 'utf8'));

  // Group endpoints by tag
  const endpointsByTag = {};
  const paths = spec.paths || {};

  Object.entries(paths).forEach(([endpointPath, methods]) => {
    Object.entries(methods).forEach(([method, operation]) => {
      if (typeof operation !== 'object' || !operation.tags) {
        return;
      }

      operation.tags.forEach((tag, tagIndex) => {
        if (!endpointsByTag[tag]) {
          endpointsByTag[tag] = [];
        }
        endpointsByTag[tag].push({
          method,
          path: endpointPath,
          operation,
          tag,
          index: endpointsByTag[tag].length,
        });
      });
    });
  });

  // Create output directory structure
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Build endpoint-to-method mapping for badge script
  const endpointMethodMap = {};

  // Generate endpoint pages by tag
  Object.entries(endpointsByTag).forEach(([tag, endpoints]) => {
    const folderName = TAG_MAPPING[tag] || tag.toLowerCase().replace(/\s+/g, '-');
    const tagDir = path.join(outputDir, folderName);

    if (!fs.existsSync(tagDir)) {
      fs.mkdirSync(tagDir, { recursive: true });
    }

    // Create category file
    const categoryPosition = SIDEBAR_POSITIONS[folderName] || 1000;
    const categoryFile = {
      label: tag,
      position: categoryPosition,
    };
    fs.writeFileSync(
      path.join(tagDir, '_category_.json'),
      JSON.stringify(categoryFile, null, 2) + '\n'
    );

    // Generate endpoint pages
    endpoints.forEach((endpoint, idx) => {
      const { safeTitle, mdxContent } = generateEndpointMDX(endpoint, spec);
      const fileName = `${String(idx * 10 + 10).padStart(2, '0')}-${safeTitle}.mdx`;
      const filePath = path.join(tagDir, fileName);
      fs.writeFileSync(filePath, mdxContent);
      
      // Add to mapping: /apis/partner-api/folder/filename (without .mdx)
      const fileBaseName = fileName.replace(/\.mdx$/, '');
      const urlPath = `/apis/partner-api/${folderName}/${fileBaseName}`;
      endpointMethodMap[urlPath] = endpoint.method.toUpperCase();
      
      console.log(`Generated: ${folderName}/${fileName}`);
    });
  });

  // Update index.mdx
  const indexContent = `---
title: Introduction
description: Introduction
sidebar_label: Introduction
sidebar_position: 0
---

<PartnerIntroductionPage />
`;

  fs.writeFileSync(path.join(outputDir, 'index.mdx'), indexContent);
  console.log('Generated index.mdx');

  // Generate badge mappings file
  const clientDir = path.resolve(miyagiRoot, 'src', 'client');
  if (!fs.existsSync(clientDir)) {
    fs.mkdirSync(clientDir, { recursive: true });
  }
  const mappingsFile = path.join(clientDir, 'partner-api-badge-mappings.js');
  const mappingsContent = `// Auto-generated by generate-partner-api-docs.cjs
// Do not edit manually - regenerate docs to update

module.exports = {
  partnerApiEndpointMethodMap: ${JSON.stringify(endpointMethodMap, null, 2)},
};
`;
  fs.writeFileSync(mappingsFile, mappingsContent);
  console.log('Generated badge mappings file');

  console.log('\n✅ Partner API docs generated successfully!');
  console.log(`📁 Output directory: ${outputDir}`);
  console.log(`📊 Generated ${Object.keys(endpointsByTag).length} tag categories`);
  console.log(
    `📄 Generated ${Object.values(endpointsByTag).reduce((sum, arr) => sum + arr.length, 0)} endpoint pages`
  );
}

// Run if called directly
if (require.main === module) {
  try {
    generateDocs();
  } catch (error) {
    console.error('Error generating docs:', error);
    process.exit(1);
  }
}

module.exports = { generateDocs };

