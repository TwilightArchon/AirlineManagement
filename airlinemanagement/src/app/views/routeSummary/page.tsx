'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';

// Define type for route data
interface Route {
  route: string;
  num_legs: number;
  leg_sequence: string;
  route_length: string;
  num_flights: number;
  flight_list: string;
  airport_sequence: string;
}

export default function RouteSummary() {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/database/view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ viewName: 'route_summary' }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch data');
        }

        const result = await response.json();
        setRoutes(result.data);
      } catch (err: unknown) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">route_summary()</h1>

      {loading ? (
        <div className="text-center py-4">Loading data...</div>
      ) : error ? (
        <div className="text-red-500 py-4">Error: {error}</div>
      ) : (
        /* Table container */
        <div className="overflow-x-auto mb-6">
          <table className="table-auto border-collapse w-full text-sm text-left">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-2">route</th>
                <th className="px-4 py-2">num_legs</th>
                <th className="px-4 py-2">leg_sequence</th>
                <th className="px-4 py-2">route_length</th>
                <th className="px-4 py-2">num_flights</th>
                <th className="px-4 py-2">flight_list</th>
                <th className="px-4 py-2">airport_sequence</th>
              </tr>
            </thead>
            <tbody>
              {routes.length > 0 ? (
                routes.map((route, idx) => (
                  <tr key={idx} className="bg-white border-b">
                    <td className="px-4 py-2">{route.route}</td>
                    <td className="px-4 py-2">{route.num_legs}</td>
                    <td className="px-4 py-2">{route.leg_sequence}</td>
                    <td className="px-4 py-2">{route.route_length}</td>
                    <td className="px-4 py-2">{route.num_flights}</td>
                    <td className="px-4 py-2">{route.flight_list}</td>
                    <td className="px-4 py-2">{route.airport_sequence}</td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b">
                  <td colSpan={7} className="px-4 py-2 text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Button variant="outline" onClick={() => router.back()}>
        Go Back
      </Button>
    </div>
  );
}
