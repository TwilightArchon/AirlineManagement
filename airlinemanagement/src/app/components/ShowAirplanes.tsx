'use client';

import { useState, useEffect } from 'react';

export default function ShowAirplanes() {
  const [airplanes, setAirplanes] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAirplanes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sql: 'SELECT * FROM airplane'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAirplanes(data.data);
      } else {
        setError(`Error: ${data.message}`);
      }
    } catch (error) {
      setError('Error: Failed to fetch airplanes');
      console.error('Query execution error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirplanes();
  }, []);

  return (
    <div className="p-4 border rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Airplanes in Database</h2>
        <button
          onClick={fetchAirplanes}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-md bg-red-100 text-red-800">
          {error}
        </div>
      )}

      {loading && <p className="text-gray-500">Loading airplanes...</p>}

      {airplanes && (
        <div className="mt-4">
          <h3 className="text-md font-medium mb-2">Results</h3>
          {Array.isArray(airplanes) && airplanes.length === 0 ? (
            <p className="text-gray-500">No airplanes found in the database</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    {airplanes && Array.isArray(airplanes) && airplanes.length > 0 && Object.keys(airplanes[0]).map((key) => (
                      <th key={key} className="py-2 px-4 border-b text-left bg-gray-100">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {airplanes && Array.isArray(airplanes) && airplanes.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((value: any, j) => (
                        <td key={j} className="py-2 px-4 border-b">
                          {value === null ? 'NULL' : value === true ? 'Yes' : value === false ? 'No' : String(value)}
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
    </div>
  );
} 