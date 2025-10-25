
"use client";

import { useState } from 'react';

export default function FinancialRatios() {
  const [activityId, setActivityId] = useState('');
  const [ratios, setRatios] = useState({
    currentRatio: null,
    debtToEquityRatio: null,
    interestCoverageRatio: null,
    operatingCashFlowRatio: null,
    netProfitMargin: null,
  });

  const fetchRatios = async () => {
    try {
      const [
        currentRatioRes,
        debtToEquityRatioRes,
        interestCoverageRatioRes,
        operatingCashFlowRatioRes,
        netProfitMarginRes,
      ] = await Promise.all([
        fetch(`http://localhost:3001/financial-ratios/current-ratio/${activityId}`),
        fetch(`http://localhost:3001/financial-ratios/debt-to-equity-ratio/${activityId}`),
        fetch(`http://localhost:3001/financial-ratios/interest-coverage-ratio/${activityId}`),
        fetch(`http://localhost:3001/financial-ratios/operating-cash-flow-ratio/${activityId}`),
        fetch(`http://localhost:3001/financial-ratios/net-profit-margin/${activityId}`),
      ]);

      const [
        currentRatioData,
        debtToEquityRatioData,
        interestCoverageRatioData,
        operatingCashFlowRatioData,
        netProfitMarginData,
      ] = await Promise.all([
        currentRatioRes.json(),
        debtToEquityRatioRes.json(),
        interestCoverageRatioRes.json(),
        operatingCashFlowRatioRes.json(),
        netProfitMarginRes.json(),
      ]);

      setRatios({
        currentRatio: currentRatioData.currentRatio,
        debtToEquityRatio: debtToEquityRatioData.debtToEquityRatio,
        interestCoverageRatio: interestCoverageRatioData.interestCoverageRatio,
        operatingCashFlowRatio: operatingCashFlowRatioData.operatingCashFlowRatio,
        netProfitMargin: netProfitMarginData.netProfitMargin,
      });
    } catch (error) {
      console.error('Error fetching financial ratios:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Ratios</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
          placeholder="Enter Activity ID"
          className="border p-2 mr-2"
        />
        <button onClick={fetchRatios} className="bg-blue-500 text-white p-2">
          Calculate
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border p-4">
          <h2 className="text-lg font-semibold">Current Ratio</h2>
          <p>{ratios.currentRatio}</p>
        </div>
        <div className="border p-4">
          <h2 className="text-lg font-semibold">Debt to Equity Ratio</h2>
          <p>{ratios.debtToEquityRatio}</p>
        </div>
        <div className="border p-4">
          <h2 className="text-lg font-semibold">Interest Coverage Ratio</h2>
          <p>{ratios.interestCoverageRatio}</p>
        </div>
        <div className="border p-4">
          <h2 className="text-lg font-semibold">Operating Cash Flow Ratio</h2>
          <p>{ratios.operatingCashFlowRatio}</p>
        </div>
        <div className="border p-4">
          <h2 className="text-lg font-semibold">Net Profit Margin</h2>
          <p>{ratios.netProfitMargin}</p>
        </div>
      </div>
    </div>
  );
}
