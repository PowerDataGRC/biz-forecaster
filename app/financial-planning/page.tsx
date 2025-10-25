
'use client';

import { useState, useEffect } from 'react';
import EditableTable from '@/components/EditableTable';

interface PlanningActivity {
  activity: string;
  description: string;
  weight: number;
  progress: number;
}

interface ProductAndService {
  description: string;
  price: number;
  sales_volume: number;
  sales_volume_unit: string;
}

interface CapitalExpense {
  item: string;
  amount: number;
}

interface OperatingExpense {
  item: string;
  amount: number;
  frequency: string;
}

interface Activity {
  activity_id: string;
  user: {
    user_id: string;
  };
  planning_activities: PlanningActivity[];
  products_and_services: ProductAndService[];
  capital_expenses: CapitalExpense[];
  operating_expenses: OperatingExpense[];
}

const FinancialPlanningPage = () => {
  const [activeTab, setActiveTab] = useState('planning');
  const [activity, setActivity] = useState<Activity | null>(null);
  const [planningActivities, setPlanningActivities] = useState<PlanningActivity[]>([]);
  const [productsAndServices, setProductsAndServices] = useState<ProductAndService[]>([]);
  const [capitalExpenses, setCapitalExpenses] = useState<CapitalExpense[]>([]);
  const [operatingExpenses, setOperatingExpenses] = useState<OperatingExpense[]>([]);
  const [clientId, ] = useState('a7252cb0-3337-4f09-a189-a20c377f375c'); // Hardcoded for now

  useEffect(() => {
    if (clientId) {
      fetch(`http://localhost:3000/activities/client/${clientId}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const latestActivity = data[0];
            setActivity(latestActivity);
            setPlanningActivities(latestActivity.planning_activities || []);
            setProductsAndServices(latestActivity.products_and_services || []);
            setCapitalExpenses(latestActivity.capital_expenses || []);
            setOperatingExpenses(latestActivity.operating_expenses || []);
          }
        });
    }
  }, [clientId]);

  const handleSave = async () => {
    if (!activity) return;

    const payload = {
      user_id: activity.user.user_id,
      client_id: clientId,
      planning_activities: planningActivities,
      products_and_services: productsAndServices,
      capital_expenses: capitalExpenses,
      operating_expenses: operatingExpenses,
    };

    await fetch(`http://localhost:3000/activities/${activity.activity_id}` , {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  };

  const planningColumns = [
    { key: 'activity', label: 'Activity' },
    { key: 'description', label: 'Description' },
    { key: 'weight', label: 'Weight' },
    { key: 'progress', label: 'Progress' },
  ];

  const productsColumns = [
    { key: 'description', label: 'Description' },
    { key: 'price', label: 'Price' },
    { key: 'sales_volume', label: 'Sales Volume' },
    { key: 'sales_volume_unit', label: 'Unit' },
  ];

  const capitalColumns = [
    { key: 'item', label: 'Item' },
    { key: 'amount', label: 'Amount' },
  ];

  const operatingColumns = [
    { key: 'item', label: 'Item' },
    { key: 'amount', label: 'Amount' },
    { key: 'frequency', label: 'Frequency' },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex border-b">
        <button
          className={`py-2 px-4 ${activeTab === 'planning' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('planning')}
        >
          Planning
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'financials' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('financials')}
        >
          Financials
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'planning' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Planning Activities</h2>
            <EditableTable columns={planningColumns} data={planningActivities} setData={setPlanningActivities} />
            <button onClick={handleSave} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              Save and Continue
            </button>
          </div>
        )}

        {activeTab === 'financials' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Products and Services</h2>
            <EditableTable columns={productsColumns} data={productsAndServices} setData={setProductsAndServices} />

            <h2 className="text-xl font-bold mt-8 mb-4">Capital Expenses</h2>
            <EditableTable columns={capitalColumns} data={capitalExpenses} setData={setCapitalExpenses} />

            <h2 className="text-xl font-bold mt-8 mb-4">Operating Expenses</h2>
            <EditableTable columns={operatingColumns} data={operatingExpenses} setData={setOperatingExpenses} />

            <button onClick={handleSave} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              Save and Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialPlanningPage;
