
'use client';

import { useState } from 'react';

interface Column {
  key: string;
  label: string;
}

interface EditableTableProps<T extends { [key: string]: any }> {
  columns: Column[];
  data: T[];
  setData: (data: T[]) => void;
}

const EditableTable = <T extends { [key: string]: any }>({ columns, data, setData }: EditableTableProps<T>) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [newRow, setNewRow] = useState<Partial<T>>({});

  const handleEdit = (index: number) => {
    setEditingRow(index);
  };

  const handleSave = () => {
    setEditingRow(null);
  };

  const handleDelete = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleAdd = () => {
    setData([...data, newRow as T]);
    setNewRow({});
  };

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, column: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [column]: e.target.value };
    setData(newData);
  };

  const handleNewRowChange = (e: React.ChangeEvent<HTMLInputElement>, column: string) => {
    setNewRow({ ...newRow, [column]: e.target.value });
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          {columns.map(col => <th key={col.key} className="py-2 px-4 border-b">{col.label}</th>)}
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map(col => (
              <td key={col.key} className="py-2 px-4 border-b">
                {editingRow === rowIndex ? (
                  <input
                    type="text"
                    value={row[col.key]}
                    onChange={(e) => handleCellChange(e, rowIndex, col.key)}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  row[col.key]
                )}
              </td>
            ))}
            <td className="py-2 px-4 border-b">
              {editingRow === rowIndex ? (
                <button onClick={() => handleSave()} className="bg-green-500 text-white p-1 rounded">Save</button>
              ) : (
                <button onClick={() => handleEdit(rowIndex)} className="bg-yellow-500 text-white p-1 rounded">Edit</button>
              )}
              <button onClick={() => handleDelete(rowIndex)} className="bg-red-500 text-white p-1 rounded ml-2">Delete</button>
            </td>
          </tr>
        ))}
        <tr>
          {columns.map(col => (
            <td key={col.key} className="py-2 px-4 border-b">
              <input
                type="text"
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
