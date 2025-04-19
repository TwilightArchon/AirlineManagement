'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SimulationCyclePage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    
    try {
      const response = await fetch('/api/database/procedure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          procedure: 'simulation_cycle',
          params: {}
        }),
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setMessage("Simulation cycle executed successfully!");
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage("An error occurred while processing your request.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Procedure: Simulation Cycle</h1>
      
      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message}
        </div>
      )}

      <div className="bg-gray-100 p-6 rounded shadow">
        <p className="mb-4">
          This procedure executes the next step in the simulation cycle. It will identify the flight with the smallest next time and process it accordingly.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
              onClick={() => router.push('/')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Run Simulation Cycle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
