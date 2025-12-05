import React from 'react';
import AttributeList from './AttributeList';
import CodeExample from './CodeExample';
import { Col } from './Layout';

interface AttributeItem {
  name: string;
  type: string;
  description: string;
  children?: AttributeItem[];
}

interface ApiDocumentationProps {
  attributes: AttributeItem[];
  code: string;
  title?: string;
  lang?: string;
  contentType?: string;
  formatLabel?: string;
}

export default function ApiDocumentation({
  attributes,
  code,
  title = 'Example response',
  lang = 'json',
  contentType,
  formatLabel,
}: ApiDocumentationProps) {
  return (
    <div 
      className="grid grid-cols-1 items-start xl:max-w-none xl:grid-cols-2"
      style={{
        gap: '32px',
      }}
    >
      <Col>
        <AttributeList attributes={attributes} />
      </Col>
      <Col sticky>
        <CodeExample 
          title={title} 
          language={lang} 
          code={code}
          contentType={contentType}
          formatLabel={formatLabel}
        />
      </Col>
    </div>
  );
}

