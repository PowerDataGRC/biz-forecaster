'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mb-6 border border-gray-200 rounded-lg shadow-md bg-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none flex justify-between items-center rounded-t-lg"
            >
                <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
                <span className="text-2xl font-light text-gray-500">{isOpen ? '−' : '+'}</span>
            </button>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-full' : 'max-h-0'}`}>
                <div className="p-4 border-t border-gray-200">
                    {children}
                </div>
            </div>
        </div>
    );
};

const FinancialEntryPage: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">Authentication Required</h1>
                <p className="text-gray-600">Please log in to access this page.</p>
            </div>
        );
    }

    const renderRows = (rowCount: number, columns: { name: string; type: 'text' | 'number' | 'textarea' | 'display'; placeholder?: string }[]) => {
        return Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                    <td key={colIndex} className="p-2">
                        {col.type === 'textarea' ? (
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder={col.placeholder || ''}
                                rows={1}
                            />
                        ) : col.type === 'display' ? (
                            <div className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600">
                                {col.placeholder || '...'}
                            </div>
                        ) : (
                            <input
                                type={col.type}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder={col.placeholder || ''}
                            />
                        )}
                    </td>
                ))}
            </tr>
        ));
    };

    const fixedAssetsColumns = [
        { name: 'Fixed Assets', type: 'text' as const },
        { name: 'Amount', type: 'number' as const },
        { name: 'Depreciation', type: 'number' as const },
        { name: 'Notes', type: 'textarea' as const },
    ];

    const operatingCapitalColumns = [
        { name: 'Operating Capital', type: 'text' as const },
        { name: 'Amount', type: 'number' as const },
        { name: 'Notes', type: 'textarea' as const },
    ];

    const fundingSourcesColumns = [
        { name: 'Sources of Funding', type: 'text' as const },
        { name: 'Percentage', type: 'number' as const, placeholder: '%' },
        { name: 'Totals', type: 'display' as const, placeholder: 'Calculated' },
        { name: 'Loan Rate', type: 'number' as const, placeholder: '%' },
        { name: 'Term in Month', type: 'number' as const },
        { name: 'Monthly Payments', type: 'display' as const, placeholder: 'Calculated' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="preparedBy" className="block text-sm font-medium text-gray-700">
                                Prepared by
                            </label>
                            <input
                                type="text"
                                id="preparedBy"
                                value={user?.displayName || user?.email || ''}
                                readOnly
                                className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                Company name
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <CollapsibleSection title="Section 1: Fixed Assets">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {fixedAssetsColumns.map((col) => (
                                        <th
                                            key={col.name}
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {col.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {renderRows(12, fixedAssetsColumns)}
                            </tbody>
                        </table>
                    </div>
                </CollapsibleSection>

                <CollapsibleSection title="Section 2: Operating Capital">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {operatingCapitalColumns.map((col) => (
                                        <th
                                            key={col.name}
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {col.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {renderRows(15, operatingCapitalColumns)}
                            </tbody>
                        </table>
                    </div>
                </CollapsibleSection>

                <CollapsibleSection title="Section 3: Sources of Funding">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {fundingSourcesColumns.map((col) => (
                                        <th
                                            key={col.name}
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {col.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {renderRows(15, fundingSourcesColumns)}
                            </tbody>
                        </table>
                    </div>
                </CollapsibleSection>
            </div>
        </div>
    );
};

export default FinancialEntryPage;