import React from 'react';
import type { ReactNode } from 'react';

export interface TableColumn {
  header: ReactNode;
  accessor?: string;
  className?: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
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
    <div 
      className={`overflow-hidden ${className || ''}`} 
      style={{ 
        borderRadius: '12px',
        border: '1px solid var(--border)',
      }}
    >
      <table className="w-full" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr 
            style={{ backgroundColor: 'var(--bg-subtle)' }} 
            className={headerClassName}
          >
            {columns.map((column, index) => (
              <th
                key={index}
                className={`font-semibold ${column.className || ''}`}
                style={{ 
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  textTransform: 'none',
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--border)',
                  borderRight: index < columns.length - 1 ? '1px solid var(--border)' : 'none',
                  color: 'var(--text-primary)',
                  textAlign: column.align || 'left',
                  width: column.width,
                }}
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
              className={rowClassName || ''}
              style={{
                backgroundColor: rowIndex % 2 === 1 ? 'var(--bg-zebra)' : 'transparent',
                transition: 'background-color 120ms ease-out',
                ...row.style,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = rowIndex % 2 === 1 ? 'var(--bg-zebra)' : 'transparent';
              }}
            >
              {row.cells.map((cell, cellIndex) => {
                // Handle empty values: null, undefined, empty string, or whitespace-only string
                const isEmpty = cell == null || cell === '' || (typeof cell === 'string' && cell.trim() === '');
                // Check if this is the last cell and it's empty (for visual de-emphasis)
                const isLastCellEmpty = cellIndex === row.cells.length - 1 && isEmpty;
                return (
                  <td
                    key={cellIndex}
                    style={{
                      fontSize: '14px',
                      lineHeight: '22px',
                      padding: '14px 16px',
                      verticalAlign: 'middle',
                      borderBottom: rowIndex < rows.length - 1 ? '1px solid var(--border)' : 'none',
                      borderRight: cellIndex < row.cells.length - 1 ? '1px solid var(--border)' : 'none',
                      color: isEmpty ? 'var(--text-empty)' : 'var(--text-primary)',
                      backgroundColor: isLastCellEmpty ? 'var(--bg-subtle)' : 'transparent',
                      textAlign: columns[cellIndex]?.align || 'left',
                      width: columns[cellIndex]?.width,
                    }}
                  >
                    {isEmpty ? (
                      <span style={{ color: 'var(--text-empty)' }}>—</span>
                    ) : (
                      cell
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

