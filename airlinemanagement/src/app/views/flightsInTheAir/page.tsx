'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function FlightsInTheAir() {
    const router = useRouter();
    const flights = [
      {
        departing_from: "ATL",
        arriving_at: "BCN",
        num_flights: 1,
        flight_list: "dl_10",
        earliest_arrival: "08:00:00",
        latest_arrival: "08:00:00",
        airplane_list: "plane_1",
      },
      {
        departing_from: "BCN",
        arriving_at: "CDG",
        num_flights: 1,
        flight_list: "lf_20",
        earliest_arrival: "11:00:00",
        latest_arrival: "11:00:00",
        airplane_list: "plane_8",
      },
    ];
  
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">flights_in_the_air()</h1>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full text-sm text-left">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-2">departing_from</th>
                <th className="px-4 py-2">arriving_at</th>
                <th className="px-4 py-2">num_flights</th>
                <th className="px-4 py-2">flight_list</th>
                <th className="px-4 py-2">earliest_arrival</th>
                <th className="px-4 py-2">latest_arrival</th>
                <th className="px-4 py-2">airplane_list</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight, idx) => (
                <tr key={idx} className="bg-white border-b">
                  <td className="px-4 py-2">{flight.departing_from}</td>
                  <td className="px-4 py-2">{flight.arriving_at}</td>
                  <td className="px-4 py-2">{flight.num_flights}</td>
                  <td className="px-4 py-2">{flight.flight_list}</td>
                  <td className="px-4 py-2">{flight.earliest_arrival}</td>
                  <td className="px-4 py-2">{flight.latest_arrival}</td>
                  <td className="px-4 py-2">{flight.airplane_list}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
        Go Back
      </Button>
      </div>
    );
  }
  