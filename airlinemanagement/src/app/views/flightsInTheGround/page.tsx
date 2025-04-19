'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';

// Define type for flight data
interface Flight {
  departing_from: string;
  num_flights: number;
  flight_list: string;
  earliest_arrival: string;
  latest_arrival: string;
  airplane_list: string;
}

export default function FlightsInTheGround() {
  const router = useRouter();
  const [flights, setFlights] = useState<Flight[]>([]);
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
          body: JSON.stringify({ viewName: 'flights_on_the_ground' }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch data');
        }

        const result = await response.json();
        setFlights(result.data);
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
      <h1 className="text-2xl font-bold mb-4">flights_on_the_ground()</h1>
      
      {loading ? (
        <div className="text-center py-4">Loading data...</div>
      ) : error ? (
        <div className="text-red-500 py-4">Error: {error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full text-sm text-left">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-2">departing_from</th>
                <th className="px-4 py-2">num_flights</th>
                <th className="px-4 py-2">flight_list</th>
                <th className="px-4 py-2">earliest_arrival</th>
                <th className="px-4 py-2">latest_arrival</th>
                <th className="px-4 py-2">airplane_list</th>
              </tr>
            </thead>
            <tbody>
              {flights.length > 0 ? (
                flights.map((flight, idx) => (
                  <tr key={idx} className="bg-white border-b">
                    <td className="px-4 py-2">{flight.departing_from}</td>
                    <td className="px-4 py-2">{flight.num_flights}</td>
                    <td className="px-4 py-2">{flight.flight_list}</td>
                    <td className="px-4 py-2">{flight.earliest_arrival}</td>
                    <td className="px-4 py-2">{flight.latest_arrival}</td>
                    <td className="px-4 py-2">{flight.airplane_list}</td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b">
                  <td colSpan={6} className="px-4 py-2 text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      <Button variant="outline" onClick={() => router.back()} className="mt-6">
        Go Back
      </Button>
    </div>
  );
}
  