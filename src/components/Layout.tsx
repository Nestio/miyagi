import React, { useState, createContext, useContext } from "react";
import clsx from "clsx";

// Create context for managing collapse state across all properties
const CollapseContext = createContext<{
  allCollapsed: boolean;
  setAllCollapsed: (value: boolean) => void;
  collapseKey: number; // Increments when expand/collapse all is clicked
} | undefined>(undefined);

export function Row({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="grid grid-cols-1 items-start xl:max-w-none xl:grid-cols-2"
      style={{
        gap: '40px',
      }}
    >
      {children}
    </div>
  );
}

export function Col({ children, sticky = false }: { children: React.ReactNode; sticky?: boolean }) {
  return (
    <div
      className={clsx(
        "[&>:first-child]:mt-0",
        "[&>:last-child]:mb-0",
        sticky && "xl:sticky xl:top-[104px]"
      )}
    >
      {children}
    </div>
  );
}

export function Properties({ children }: { children: React.ReactNode }) {
  const [allCollapsed, setAllCollapsed] = useState(true);
  const [collapseKey, setCollapseKey] = useState(0);
  const parentContext = useContext(CollapseContext);

  const toggleAll = () => {
    setAllCollapsed(!allCollapsed);
    // Increment key to force all properties to reset their manual toggle state
    setCollapseKey(prev => prev + 1);
  };

  // Don't show the button if this Properties component is nested inside a Property
  const isNestedInProperty = parentContext !== undefined;

  return (
    <div className="my-6">
      {!isNestedInProperty && (
        <div className="flex justify-end" style={{ marginBottom: '20px', marginTop: '4px' }}>
          <button
            onClick={toggleAll}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm text-gray-600 hover:bg-gray-100 transition-colors bg-transparent cursor-pointer"
            aria-label={allCollapsed ? "Expand all properties" : "Collapse all properties"}
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 flex-shrink-0"
              style={{
                transform: allCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
            {allCollapsed ? "Expand All" : "Collapse All"}
          </button>
        </div>
      )}
      <CollapseContext.Provider value={{ 
        allCollapsed, 
        setAllCollapsed,
        collapseKey,
      }}>
        <ul
          role="list"
          className="m-0 list-none p-0 attribute-list w-full"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
          }}
        >
          {children}
        </ul>
      </CollapseContext.Provider>
    </div>
  );
}

interface PropertyProps {
  name: string;
  children?: React.ReactNode;
  type?: string;
  required?: boolean;
  example?: string;
  nullable?: boolean;
  format?: string;
  pattern?: string;
  constraints?: Record<string, any>;
}

export function Property({ 
  name, 
  children, 
  type, 
  required,
  example,
  nullable,
  format,
  pattern,
  constraints,
}: PropertyProps) {
  const context = useContext(CollapseContext);
  const { allCollapsed, collapseKey } = context || { 
    allCollapsed: true,
    collapseKey: 0,
  };
  const [isCollapsed, setIsCollapsed] = useState(allCollapsed);
  const [lastCollapseKey, setLastCollapseKey] = useState(collapseKey);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const contentInnerRef = React.useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = React.useState(0);

  // Reset to global state when collapseKey changes (expand/collapse all was clicked)
  React.useEffect(() => {
    if (collapseKey !== lastCollapseKey) {
      setLastCollapseKey(collapseKey);
      setIsCollapsed(allCollapsed);
    }
  }, [collapseKey, lastCollapseKey, allCollapsed]);

  // Calculate height by measuring the actual content when expanded
  const updateHeight = React.useCallback(() => {
    if (contentInnerRef.current && !isCollapsed) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        if (contentInnerRef.current) {
          const height = contentInnerRef.current.scrollHeight;
          setContentHeight(height);
        }
      });
    } else if (isCollapsed) {
      setContentHeight(0);
    }
  }, [isCollapsed]);

  // Use ResizeObserver to watch for content height changes (including nested properties expanding)
  React.useEffect(() => {
    if (!contentInnerRef.current || isCollapsed) {
      setContentHeight(0);
      return;
    }

    // Initial height calculation
    const initialTimer = setTimeout(() => {
      updateHeight();
    }, 0);

    // Use ResizeObserver to watch for changes in nested content
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    // Observe the main content container - this should catch all nested size changes
    resizeObserver.observe(contentInnerRef.current);

    // Also observe all nested expandable containers
    const observeAllNested = () => {
      if (contentInnerRef.current) {
        // Find all elements with max-height transitions (nested property containers)
        const allElements = contentInnerRef.current.querySelectorAll('*');
        allElements.forEach((el) => {
          const style = window.getComputedStyle(el);
          if (style.maxHeight && style.maxHeight !== 'none' && style.maxHeight !== '0px') {
            resizeObserver.observe(el);
          }
        });
      }
    };

    // Observe nested elements
    const observeTimer = setTimeout(observeAllNested, 100);

    // Also use MutationObserver to catch when nested properties expand/collapse
    const mutationObserver = new MutationObserver(() => {
      updateHeight();
      // Re-observe nested elements
      setTimeout(observeAllNested, 50);
    });

    mutationObserver.observe(contentInnerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style'],
    });

    // More frequent periodic check when expanded to catch nested animations
    const intervalId = setInterval(() => {
      updateHeight();
    }, 100);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(observeTimer);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      clearInterval(intervalId);
    };
  }, [isCollapsed, updateHeight]);

  // Recalculate when collapse state changes
  React.useEffect(() => {
    if (isCollapsed) {
      setContentHeight(0);
    } else {
      // When expanding, wait a bit for nested content to render
      const timer = setTimeout(() => {
        updateHeight();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isCollapsed, updateHeight]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling to parent properties
    setIsCollapsed(!isCollapsed);
    // Update lastCollapseKey to current to prevent context from overriding manual toggle
    setLastCollapseKey(collapseKey);
  };

  const outerContainerClasses = clsx(
    "border border-[#ececf3] rounded-xl overflow-hidden bg-white transition-all duration-150",
    "hover:shadow-[0_2px_6px_rgba(15,23,42,0.04)]",
    !isCollapsed && "bg-[#fff2ff] ring-1 ring-[#ff2fff]/20"
  );

  return (
    <li className="m-0 p-0 list-none">
      <div
        className={outerContainerClasses}
        style={{
          padding: 0,
        }}
      >
        {/* Header row (always visible) */}
        <button
          className="px-4 flex items-center justify-between w-full text-left hover:bg-[#fafafb] border-none cursor-pointer transition-all group"
          style={{
            paddingTop: '9px',
            paddingBottom: '9px',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleToggle(e);
          }}
          data-open={!isCollapsed}
        >
          {/* Left Side - Field Name and Type */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Chevron Icon - Modern Linear-style */}
            <svg
              className={clsx(
                "flex-shrink-0 transition-transform duration-150 text-gray-400 group-hover:text-gray-600",
                isCollapsed ? "rotate-0" : "rotate-90"
              )}
              style={{
                width: '16px',
                height: '16px',
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>

            {/* Field Name */}
            <span
              className="flex-shrink-0"
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: '#1f2937',
              }}
            >
              {name}
            </span>

            {/* Type Badge */}
            {type && (
              <span
                className="flex-shrink-0"
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  padding: '2px 6px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255,184,255,0.3)',
                  color: '#ff2fff',
                  border: '1px solid rgba(255,184,255,0.5)',
                }}
              >
                {type}
              </span>
            )}

            {/* Required/Optional Label */}
            {required !== undefined && (
              <span
                className="text-xs flex-shrink-0"
                style={{
                  fontSize: '12px',
                  color: required ? '#DC2626' : '#7a7a85',
                }}
              >
                {required ? 'Required' : 'Optional'}
              </span>
            )}
          </div>
        </button>

        {/* Expanded content (only when open) */}
        {!isCollapsed && (
          <div
            ref={contentRef}
            className="border-t border-[#ffb8ff] bg-[#fafafb] px-4 py-3 text-[14px] leading-[1.55] text-gray-600"
            style={{
              animation: 'fadeIn 0.18s ease-out',
            }}
          >
            <div ref={contentInnerRef}>
              {children && (
                <div className="space-y-4">
                  {children}
                </div>
              )}

              {/* Meta Details */}
              {(nullable !== undefined || format || pattern || constraints) && (
                <div
                  className="mt-4 pt-4 border-t border-[#ececf3]"
                  style={{
                    fontSize: '12px',
                    color: '#7a7a85',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  {nullable !== undefined && (
                    <span>Nullable: {nullable ? 'Yes' : 'No'}</span>
                  )}
                  {format && <span>Format: {format}</span>}
                  {pattern && <span>Pattern: {pattern}</span>}
                  {constraints && Object.entries(constraints).map(([key, value]) => (
                    <span key={key}>{key}: {String(value)}</span>
                  ))}
                </div>
              )}

              {/* Example Value Block */}
              {example && (
                <div
                  className="mt-4"
                  style={{
                    backgroundColor: 'var(--code-bg)',
                    borderRadius: '12px',
                    padding: '11px',
                    fontFamily: '"JetBrains Mono", "IBM Plex Mono", monospace',
                    fontSize: '13.5px',
                    lineHeight: '1.5',
                    letterSpacing: '-0.2px',
                    color: '#ffffff',
                  }}
                >
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{example}</pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

