'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';

// Define type for people data
interface Person {
  departing_from: string;
  arriving_at: string;
  num_airplanes: number;
  airplane_list: string;
  flight_list: string;
  earliest_arrival: string;
  latest_arrival: string;
  num_pilots: number;
  num_passengers: number;
  joint_pilots_passengers: number;
  person_list: string;
}

export default function PeopleInTheAir() {
  const router = useRouter();
  const [people, setPeople] = useState<Person[]>([]);
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
          body: JSON.stringify({ viewName: 'people_in_the_air' }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch data');
        }

        const result = await response.json();
        setPeople(result.data);
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
      <h1 className="text-2xl font-bold mb-4">people_in_the_air()</h1>
      
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
                <th className="px-4 py-2">arriving_at</th>
                <th className="px-4 py-2">num_airplanes</th>
                <th className="px-4 py-2">airplane_list</th>
                <th className="px-4 py-2">flight_list</th>
                <th className="px-4 py-2">earliest_arrival</th>
                <th className="px-4 py-2">latest_arrival</th>
                <th className="px-4 py-2">num_pilots</th>
                <th className="px-4 py-2">num_passengers</th>
                <th className="px-4 py-2">joint_pilots_passengers</th>
                <th className="px-4 py-2">person_list</th>
              </tr>
            </thead>
            <tbody>
              {people.length > 0 ? (
                people.map((person, idx) => (
                  <tr key={idx} className="bg-white border-b">
                    <td className="px-4 py-2">{person.departing_from}</td>
                    <td className="px-4 py-2">{person.arriving_at}</td>
                    <td className="px-4 py-2">{person.num_airplanes}</td>
                    <td className="px-4 py-2">{person.airplane_list}</td>
                    <td className="px-4 py-2">{person.flight_list}</td>
                    <td className="px-4 py-2">{person.earliest_arrival}</td>
                    <td className="px-4 py-2">{person.latest_arrival}</td>
                    <td className="px-4 py-2">{person.num_pilots}</td>
                    <td className="px-4 py-2">{person.num_passengers}</td>
                    <td className="px-4 py-2">{person.joint_pilots_passengers}</td>
                    <td className="px-4 py-2">{person.person_list}</td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b">
                  <td colSpan={11} className="px-4 py-2 text-center">No data available</td>
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
  