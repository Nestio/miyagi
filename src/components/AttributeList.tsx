import Attribute from './Attribute';
import { Properties } from './Layout';

interface AttributeItem {
  name: string;
  type: string;
  description: string;
  children?: AttributeItem[];
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
          >
            {attribute.children && <AttributeList attributes={attribute.children} />}
          </Attribute>
        ))}
      </Properties>
    </>
  );
};

export default AttributeList;
