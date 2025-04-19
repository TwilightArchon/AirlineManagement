'use client';

import { useState } from 'react';

export default function DatabaseTestButton() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    try {
      setLoading(true);
      setStatus(null);
      
      const response = await fetch('/api/database', {
        method: 'GET',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus(`Success: ${data.message}`);
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setStatus('Error: Failed to test connection');
      console.error('Connection test error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-4">Database Connection Test</h2>
      
      <button
        onClick={testConnection}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </button>
      
      {status && (
        <div className={`mt-4 p-3 rounded-md ${status.includes('Success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status}
        </div>
      )}
    </div>
  );
} 