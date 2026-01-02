
import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
}

const GenericTable = <T extends { id: string }>({ data, columns, onRowClick }: GenericTableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 dark:bg-slate-900/50">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={`px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {data.length > 0 ? (
            data.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => onRowClick?.(item)}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group"
              >
                {columns.map((col, idx) => (
                  <td key={idx} className={`px-6 py-4 text-sm text-slate-700 dark:text-slate-300 ${col.className || ''}`}>
                    {typeof col.accessor === 'function' ? col.accessor(item) : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400">
                Nenhum dado encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
