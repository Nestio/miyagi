import React from 'react';
import type { ReactNode } from 'react';

export interface TableColumn {
  header: ReactNode;
  accessor?: string;
  className?: string;
}

export interface TableRow {
  cells: ReactNode[];
  className?: string;
  style?: React.CSSProperties;
}

export interface ModernTableProps {
  columns: TableColumn[];
  rows: TableRow[];
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
}

export default function ModernTable({
  columns,
  rows,
  className,
  headerClassName,
  rowClassName,
}: ModernTableProps) {
  return (
    <div className={`overflow-hidden rounded-xl shadow-sm ${className || ''}`} style={{ 
      border: '1px solid #e5e7eb' 
    }}>
      <table className="w-full" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)' }} className={headerClassName}>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-5 py-4 text-left text-sm font-semibold ${column.className || ''}`}
                style={{ color: '#1f2937', borderBottom: '1px solid #e5e7eb' }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${rowClassName || ''} ${row.className || ''}`}
              style={{
                ...(rowIndex % 2 === 0 ? { backgroundColor: '#fafafa' } : {}),
                ...row.style,
              }}
            >
              {row.cells.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-5 py-4 text-sm leading-relaxed"
                  style={{
                    color: 'var(--docs-color-text-100)',
                    borderBottom: rowIndex < rows.length - 1 ? '1px solid #f3f4f6' : 'none',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

