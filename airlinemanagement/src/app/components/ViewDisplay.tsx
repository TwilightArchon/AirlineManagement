'use client';

import { useState } from 'react';

interface ViewOption {
  name: string;
  description: string;
}

export default function ViewDisplay() {
  const [viewData, setViewData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedView, setSelectedView] = useState<string>('');

  // Available database views
  const viewOptions: ViewOption[] = [
    { name: 'flights_in_the_air', description: 'Shows flights currently in the air' },
    { name: 'flights_on_the_ground', description: 'Shows flights currently on the ground' },
    { name: 'people_in_the_air', description: 'Shows people currently in the air' },
    { name: 'people_on_the_ground', description: 'Shows people currently on the ground' },
    { name: 'route_summary', description: 'Shows a summary of all routes' },
    { name: 'alternative_airports', description: 'Shows airports in the same city/state' }
  ];

  const fetchView = async () => {
    if (!selectedView) {
      setError('Please select a view to display');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setViewData(null);

      const response = await fetch('/api/database/view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          viewName: selectedView
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setViewData(data.data);
      } else {
        setError(`Error: ${data.message}`);
      }
    } catch (error) {
      setError('Error: Failed to fetch view data');
      console.error('View fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Alternative method using a direct SQL query if views aren't working
  const fetchWithSql = async () => {
    try {
      setLoading(true);
      setError(null);
      setViewData(null);

      const response = await fetch('/api/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sql: `SELECT * FROM ${selectedView}`
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setViewData(data.data);
      } else {
        setError(`Error: ${data.message}`);
      }
    } catch (error) {
      setError('Error: Failed to fetch view data');
      console.error('SQL query error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-4">Database Views</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="viewSelect">
          Select a View
        </label>
        <div className="flex gap-2">
          <select
            id="viewSelect"
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="flex-1 p-2 border rounded-md"
          >
            <option value="">-- Select a view --</option>
            {viewOptions.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          
          <button
            onClick={fetchWithSql}
            disabled={loading || !selectedView}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Display View'}
          </button>
        </div>
        
        {selectedView && (
          <p className="mt-1 text-sm text-gray-500">
            {viewOptions.find(option => option.name === selectedView)?.description}
          </p>
        )}
      </div>
      
      {error && (
        <div className="mt-4 p-3 rounded-md bg-red-100 text-red-800">
          {error}
        </div>
      )}
      
      {loading && <p className="text-gray-500 mt-4">Loading view data...</p>}
      
      {viewData && (
        <div className="mt-4">
          <h3 className="text-md font-medium mb-2">Results from {selectedView}</h3>
          {Array.isArray(viewData) && viewData.length === 0 ? (
            <p className="text-gray-500">No data found in this view</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    {viewData && Array.isArray(viewData) && viewData.length > 0 && Object.keys(viewData[0]).map((key) => (
                      <th key={key} className="py-2 px-4 border-b text-left bg-gray-100">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {viewData && Array.isArray(viewData) && viewData.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((value: any, j) => (
                        <td key={j} className="py-2 px-4 border-b">
                          {value === null ? 'NULL' : String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-6 p-3 rounded-md bg-yellow-100 text-yellow-800">
        <p className="font-semibold">Note:</p>
        <p>
          If you see placeholder values (like '_'), you need to implement the view definitions 
          in your database. Check the cs4400_sams_phase3_mechanics_TEMPLATE_v0.sql file and 
          update the view definitions with proper SQL queries.
        </p>
      </div>
    </div>
  );
} 