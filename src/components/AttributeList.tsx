import Attribute from './Attribute';
import { Properties } from './Layout';

interface AttributeItem {
  name: string;
  type: string;
  description: string;
  children?: AttributeItem[];
  required?: boolean;
  nullable?: boolean;
  example?: string;
  format?: string;
  pattern?: string;
  constraints?: Record<string, any>;
}

interface AttributeListProps {
  attributes: AttributeItem[];
}

const AttributeList = ({ attributes }: AttributeListProps) => {
  if (!Array.isArray(attributes) || attributes.length === 0) {
    return null;
  }

  return (
    <>
      <Properties>
        {attributes.map((attribute) => (
          <Attribute
            key={attribute.name}
            name={attribute.name}
            type={attribute.type}
            description={attribute.description}
            required={attribute.required}
            nullable={attribute.nullable}
            example={attribute.example}
            format={attribute.format}
            pattern={attribute.pattern}
            constraints={attribute.constraints}
          >
            {attribute.children && <AttributeList attributes={attribute.children} />}
          </Attribute>
        ))}
      </Properties>
    </>
  );
};

export default AttributeList;
