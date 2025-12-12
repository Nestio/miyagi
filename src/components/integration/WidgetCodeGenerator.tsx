import React, { useState, useEffect } from 'react';
import { Copy, CheckCircle } from 'react-feather';

interface WidgetCodeGeneratorProps {
  defaultWidgetType?: 'lead_capture' | 'lead_capture_appointment';
}

export default function WidgetCodeGenerator({ defaultWidgetType = 'lead_capture' }: WidgetCodeGeneratorProps) {
  const [formData, setFormData] = useState({
    apiKey: '',
    groupId: '',
    containerId: '',
    brandColor: '',
    location: '',
    campaignInfo: '',
    onComplete: 'lead-form-submission',
    submitLabel: '',
    unitId: '',
    buttonTextColor: '',
    textColor: '',
    widgetType: defaultWidgetType,
  });

  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    // Determine widget type based on current page if not explicitly set
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const isAppointmentPage = currentPath.includes('appointment-scheduler');
      const widgetType = isAppointmentPage ? 'lead_capture_appointment' : 'lead_capture';
      setFormData(prev => ({ ...prev, widgetType }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateCode = () => {
    const {
      apiKey,
      groupId,
      containerId,
      brandColor,
      location,
      campaignInfo,
      onComplete,
      submitLabel,
      unitId,
      buttonTextColor,
      textColor,
      widgetType,
    } = formData;

    if (!apiKey || !groupId) {
      setFormError('API Key and Group ID are required.');
      return;
    }

    setFormError('');
    let code = `<script src="https://integrations.nestio.com/contact-widget/v1/integration.js" id="nestio-lead-capture-frame"></script>\n`;
    code += `<script type="text/javascript">\n`;
    code += `NestioLeadCapture({\n`;
    code += `  "type": "${widgetType}",\n`;
    code += `  "key": "${apiKey}",\n`;
    code += `  "group": ${groupId},\n`;
    if (containerId) code += `  "containerId": "${containerId}",\n`;
    if (brandColor) code += `  "color": "${brandColor}",\n`;
    if (location) code += `  "location": "${location}",\n`;
    if (campaignInfo) code += `  "campaignInfo": "${campaignInfo}",\n`;
    if (submitLabel) code += `  "submitLabel": "${submitLabel}",\n`;
    if (unitId) code += `  "unit": ${unitId},\n`;
    if (buttonTextColor) code += `  "buttonTextColor": "${buttonTextColor}",\n`;
    if (textColor) code += `  "textColor": "${textColor}",\n`;
    if (onComplete) {
      code += `  onComplete: function() {\n`;
      code += `    dataLayer.push({'event': '${onComplete}'});\n`;
      code += `  }\n`;
    }

    code = code.trim().replace(/,$/, '');
    code += `\n});\n`;
    code += `</script>`;

    setGeneratedCode(code);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const fieldLabels: Record<string, string> = {
    apiKey: 'API Key',
    groupId: 'Group ID',
    containerId: 'Container ID',
    brandColor: 'Brand Color (hex)',
    location: 'Location',
    campaignInfo: 'Campaign Info',
    onComplete: 'OnComplete Event Name',
    submitLabel: 'Submit Label',
    unitId: 'Unit ID',
    buttonTextColor: 'Button Text Color (hex)',
    textColor: 'Text Color (hex)',
    widgetType: 'Widget Type',
  };

  return (
    <div
      style={{
        margin: '32px 0',
        padding: '24px',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: '20px',
          fontSize: '18px',
          fontWeight: 600,
          color: '#111827',
        }}
      >
        Widget Code Generator
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label
              style={{
                fontWeight: 500,
                fontSize: '14px',
                color: '#374151',
              }}
            >
              {fieldLabels[key] || key.replace(/([A-Z])/g, ' $1')}
              {(key === 'apiKey' || key === 'groupId') && (
                <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>
              )}
            </label>
            {key === 'widgetType' ? (
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  backgroundColor: '#ffffff',
                  color: '#111827',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#8b5cf6';
                  e.currentTarget.style.outline = 'none';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
              >
                <option value="lead_capture">Lead Capture</option>
                <option value="lead_capture_appointment">Lead Capture Appointment</option>
              </select>
            ) : (
              <input
                type={key === 'groupId' || key === 'unitId' ? 'number' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={
                  key === 'apiKey' || key === 'groupId'
                    ? 'Required'
                    : key === 'brandColor' || key === 'buttonTextColor' || key === 'textColor'
                    ? 'e.g., 74FFE7'
                    : 'Optional'
                }
                required={key === 'apiKey' || key === 'groupId'}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: formError && (key === 'apiKey' || key === 'groupId')
                    ? '1px solid #ef4444'
                    : '1px solid #d1d5db',
                  fontSize: '14px',
                  backgroundColor: '#ffffff',
                  color: '#111827',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#8b5cf6';
                  e.currentTarget.style.outline = 'none';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
              />
            )}
          </div>
        ))}
        {formError && (
          <div
            style={{
              color: '#ef4444',
              fontWeight: 500,
              fontSize: '14px',
              padding: '12px',
              backgroundColor: '#fef2f2',
              borderRadius: '8px',
              border: '1px solid #fecaca',
            }}
          >
            {formError}
          </div>
        )}
        <button
          onClick={generateCode}
          style={{
            padding: '12px 24px',
            background: '#8b5cf6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'background-color 0.2s',
            marginTop: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#7c3aed';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#8b5cf6';
          }}
        >
          Generate Code
        </button>
      </div>

      {generatedCode && (
        <div
          style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#1a0f1e',
            borderRadius: '12px',
            border: '1px solid #2a1a2f',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
            }}
          >
            <h4
              style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: 600,
                color: '#ffffff',
              }}
            >
              Generated Code:
            </h4>
            <button
              onClick={copyToClipboard}
              style={{
                padding: '8px 16px',
                background: copied ? '#22c55e' : '#8b5cf6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background-color 0.2s',
              }}
            >
              {copied ? (
                <>
                  <CheckCircle size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowX: 'auto',
              color: '#ffffff',
              fontSize: '13px',
              lineHeight: '1.6',
              fontFamily: '"JetBrains Mono", "IBM Plex Mono", monospace',
              margin: 0,
            }}
          >
            {generatedCode}
          </pre>
        </div>
      )}
    </div>
  );
}

