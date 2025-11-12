
'use client';

import React, { useState } from 'react';

interface Column {
  key: string;
  header: string;
  type: 'text' | 'number';
}

interface RowData extends Record<string, string | number> {
  [key: string]: string | number;
}

interface EditableTableProps {
  columns: Column[];
  data: RowData[];
  onDataChange: (newData: RowData[]) => void;
}

const EditableTable: React.FC<EditableTableProps> = ({ columns, data, onDataChange }) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [tableData, setTableData] = useState<RowData[]>(data);
  const [newRow, setNewRow] = useState<Partial<RowData>>({});

  const handleEdit = (index: number) => {
    setEditingRow(index);
  };

  const handleSave = () => {
    setEditingRow(null);
    onDataChange(tableData); // Propagate changes up
  };

  const handleDelete = (index: number) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
    onDataChange(newData);
  };

  const handleAdd = () => {
    // Ensure new row has all keys defined by columns
    const newRowComplete = columns.reduce((acc, col) => {
      acc[col.key] = newRow[col.key] || '';
      return acc;
    }, {} as RowData);

    const newData = [...tableData, newRowComplete];
    setTableData(newData);
    onDataChange(newData);
    setNewRow({});
  };

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, columnKey: string) => {
    const newData = [...tableData];
    newData[rowIndex] = { ...newData[rowIndex], [columnKey]: e.target.value };
    setTableData(newData);
  };

  const handleNewRowChange = (e: React.ChangeEvent<HTMLInputElement>, columnKey: string) => {
    setNewRow({ ...newRow, [columnKey]: e.target.value });
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          {columns.map(col => <th key={col.key} className="py-2 px-4 border-b">{col.header}</th>)}
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map(col => (
              <td key={col.key} className="py-2 px-4 border-b">
                {editingRow === rowIndex ? (
                  <input
                    type={col.type}
                    value={row[col.key] || ''}
                    onChange={(e) => handleCellChange(e, rowIndex, col.key)}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  String(row[col.key])
                )}
              </td>
            ))}
            <td className="py-2 px-4 border-b">
              {editingRow === rowIndex ? (
                <button onClick={handleSave} className="bg-green-500 text-white p-1 rounded">Save</button>
              ) : (
                <button onClick={() => handleEdit(rowIndex)} className="bg-yellow-500 text-white p-1 rounded">Edit</button>
              )}
              <button onClick={() => handleDelete(rowIndex)} className="bg-red-500 text-white p-1 rounded ml-2">Delete</button>
            </td>
          </tr>
        ))}
        <tr>
          {columns.map((col) => (
            <td key={col.key} className="py-2 px-4 border-b">
              <input
                type={col.type}
                value={newRow[col.key] || ''}
                onChange={(e) => handleNewRowChange(e, col.key)}
                className="w-full p-1 border rounded"
              />
            </td>
          ))}
          <td className="py-2 px-4 border-b">
            <button onClick={handleAdd} className="bg-blue-500 text-white p-1 rounded">Add</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EditableTable;
