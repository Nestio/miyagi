import React, { useEffect, useState } from 'react';

export default function AppointmentSchedulerWidget() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window === 'undefined' || !document) {
      return;
    }

    const containerId = 'appointment-widget-container';
    const scriptId = 'nestio-lead-capture-frame';
    
    const initializeWidget = () => {
      if (typeof (window as any).NestioLeadCapture === 'function') {
        (window as any).NestioLeadCapture({
          type: 'lead_capture_appointment',
          key: '22e46f067466434fab4cdb6f36df1c63',
          group: 606,
          color: '74FFE7',
          location: '123 First St.',
          containerId: containerId
        });
      }
    };

    // Check if script is already loaded
    if (typeof (window as any).NestioLeadCapture === 'function') {
      // Script already loaded, initialize immediately
      setTimeout(initializeWidget, 100);
    } else {
      // Script not loaded, check if it's already in the DOM
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      
      if (!script) {
        // Create and load the script
        script = document.createElement('script');
        script.src = 'https://integrations.nestio.com/contact-widget/v1/integration.js';
        script.id = scriptId;
        script.async = true;
        document.body.appendChild(script);
      }

      // Wait for script to load
      const checkScript = setInterval(() => {
        if (typeof (window as any).NestioLeadCapture === 'function') {
          clearInterval(checkScript);
          setTimeout(initializeWidget, 100);
        }
      }, 50);

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkScript);
      }, 10000);
    }
  }, []);

  if (!isClient) {
    return (
      <div 
        style={{
          minHeight: '400px',
          margin: '24px 0',
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          backgroundColor: '#f9fafb',
        }}
      />
    );
  }

  return (
    <div 
      id="appointment-widget-container"
      style={{
        minHeight: '400px',
        margin: '24px 0',
        padding: '24px',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        backgroundColor: '#f9fafb',
      }}
    />
  );
}

