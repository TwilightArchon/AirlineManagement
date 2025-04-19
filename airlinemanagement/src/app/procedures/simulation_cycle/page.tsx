'use client';

import React from "react";

export default function SimulationCyclePage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Advancing simulation cycle");
    // axios.post('/api/simulation-cycle')
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Procedure: Simulation Cycle</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded shadow grid grid-cols-1 gap-4"
      >
        <p className="text-lg font-medium">simulation_cycle()</p>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
            onClick={() => console.log("Simulation cycle canceled")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}
