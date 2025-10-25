
"use client";

import { useState } from 'react';

const libraryContent = {
  introduction: {
    title: 'Introduction to Financial Ratios',
    content: `
      <p>Financial ratios are a set of metrics that provide insights into a company's financial health and performance. They are calculated using data from a company's financial statements, including the balance sheet, income statement, and cash flow statement.</p>
      <p>By analyzing financial ratios, you can gain a better understanding of a company's liquidity, profitability, and solvency. This information can be used to make more informed decisions about investing, lending, and other business activities.</p>
    `,
  },
  currentRatio: {
    title: 'Current Ratio',
    content: `
      <p>The current ratio is a liquidity ratio that measures a company's ability to pay its short-term obligations. It is calculated by dividing current assets by current liabilities.</p>
      <p><strong>Formula:</strong> Current Ratio = Current Assets / Current Liabilities</p>
      <p>A current ratio of 2:1 or higher is generally considered to be good. This means that the company has twice as many current assets as current liabilities.</p>
    `,
  },
  debtToEquityRatio: {
    title: 'Debt to Equity Ratio',
    content: `
      <p>The debt-to-equity ratio is a solvency ratio that measures a company's financial leverage. It is calculated by dividing total debt by total equity.</p>
      <p><strong>Formula:</strong> Debt to Equity Ratio = Total Debt / Total Equity</p>
      <p>A high debt-to-equity ratio can indicate that a company is at risk of defaulting on its loans. However, it can also indicate that the company is using debt to finance its growth.</p>
    `,
  },
  interestCoverageRatio: {
    title: 'Interest Coverage Ratio',
    content: `
      <p>The interest coverage ratio is a solvency ratio that measures a company's ability to pay its interest expense. It is calculated by dividing earnings before interest and taxes (EBIT) by interest expense.</p>
      <p><strong>Formula:</strong> Interest Coverage Ratio = EBITDA / Interest Expense</p>
      <p>An interest coverage ratio of 2.0 or higher is generally considered to be good. This means that the company's earnings are twice as high as its interest expense.</p>
    `,
  },
  operatingCashFlowRatio: {
    title: 'Operating Cash Flow Ratio',
    content: `
      <p>The operating cash flow ratio is a cash flow ratio that measures a company's ability to generate cash from its operations. It is calculated by dividing operating cash flow by current liabilities.</p>
      <p><strong>Formula:</strong> Operating Cash Flow Ratio = Operating Cash Flow / Current Liabilities</p>
      <p>A high operating cash flow ratio indicates that a company is generating enough cash to cover its short-term debts.</p>
    `,
  },
  netProfitMargin: {
    title: 'Net Profit Margin',
    content: `
      <p>The net profit margin is a profitability ratio that measures a company's ability to generate a profit from its revenue. It is calculated by dividing net profit by total revenue and multiplying by 100.</p>
      <p><strong>Formula:</strong> Net Profit Margin = (Net Profit / Total Revenue) * 100</p>
      <p>A high net profit margin indicates that a company is efficient at converting revenue into profit.</p>
    `,
  },
};

type LibraryTopic = keyof typeof libraryContent;

export default function Library() {
  const [activeTopic, setActiveTopic] = useState<LibraryTopic>('introduction');

  return (
    <div className="flex">
      <aside className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Library</h2>
        <ul>
          {(Object.keys(libraryContent) as LibraryTopic[]).map((topic) => (
            <li key={topic} className="mb-2">
              <button
                onClick={() => setActiveTopic(topic)}
                className={`text-left w-full p-2 rounded ${activeTopic === topic ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
                {libraryContent[topic].title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">{libraryContent[activeTopic].title}</h1>
        <div dangerouslySetInnerHTML={{ __html: libraryContent[activeTopic].content }} />
      </main>
    </div>
  );
}
