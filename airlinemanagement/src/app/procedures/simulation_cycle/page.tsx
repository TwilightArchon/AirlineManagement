'use client';

import React from "react";
import { useRouter } from "next/navigation";

export default function SimulationCyclePage() {
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Starting simulation cycle");
    // API call logic here
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Procedure: Simulation Cycle</h1>
      <p className="mb-6">
        This procedure advances the simulation by one day. All planes in the air will attempt to land.
        All crew and passengers will update their status accordingly.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded shadow"
      >
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
            Start Cycle
          </button>
        </div>
      </form>
    </div>
  );
}
