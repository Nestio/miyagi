import React from 'react';
import { Properties, Property } from './Layout';

interface AttributeProps {
  name: string;
  type: string;
  description: string;
  children?: React.ReactNode;
  required?: boolean;
  example?: string;
  nullable?: boolean;
  format?: string;
  pattern?: string;
  constraints?: Record<string, any>;
}

const Attribute = ({ 
  name, 
  type, 
  description, 
  children,
  required,
  example,
  nullable,
  format,
  pattern,
  constraints,
}: AttributeProps) => (
  <Property 
    name={name} 
    type={type}
    required={required}
    example={example}
    nullable={nullable}
    format={format}
    pattern={pattern}
    constraints={constraints}
  >
    {/* Description */}
    <p 
      className="text-[14px] text-gray-600 leading-[1.6]"
      style={{ 
        margin: 0,
      }}
    >
      {description}
    </p>
    {children && <Properties>{children}</Properties>}
  </Property>
);

export default Attribute;

