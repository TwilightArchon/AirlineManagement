'use client';

import { useState } from 'react';

export default function CustomQueryForm() {
  const [sqlQuery, setSqlQuery] = useState('');
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const executeQuery = async () => {
    if (!sqlQuery.trim()) {
      setError('SQL query is required');
      return;
    }

    try {
      setLoading(true);
      setResults(null);
      setError(null);

      const response = await fetch('/api/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sql: sqlQuery
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data.data);
      } else {
        setError(`Error: ${data.message}`);
      }
    } catch (error) {
      setError('Error: Failed to execute query');
      console.error('Query execution error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-4">Execute Custom SQL Query</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="sqlQuery">
          SQL Query
        </label>
        <textarea
          id="sqlQuery"
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          className="w-full p-2 border rounded-md h-32 font-mono"
          placeholder="SELECT * FROM airline;"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={executeQuery}
          disabled={loading || !sqlQuery.trim()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? 'Executing...' : 'Execute Query'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-md bg-red-100 text-red-800">
          {error}
        </div>
      )}

      {results && (
        <div className="mt-4">
          <h3 className="text-md font-medium mb-2">Results</h3>
          {Array.isArray(results) && results.length === 0 ? (
            <p className="text-gray-500">No results returned</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    {results && Array.isArray(results) && results.length > 0 && Object.keys(results[0]).map((key) => (
                      <th key={key} className="py-2 px-4 border-b text-left bg-gray-100">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results && Array.isArray(results) && results.map((row, i) => (
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
    </div>
  );
} 