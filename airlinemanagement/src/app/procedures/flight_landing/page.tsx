'use client';

import React, { useState } from "react";

export default function FlightLandingPage() {
  const [flightID, setFlightID] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Landing flight:", flightID);
    // axios.post('/api/flight-landing', { flightID })
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Procedure: Flight Landing</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded shadow grid grid-cols-1 gap-4"
      >
        <div>
          <label className="block font-semibold mb-1">Flight ID</label>
          <input
            type="text"
            name="flightID"
            value={flightID}
            onChange={(e) => setFlightID(e.target.value)}
            className="w-full p-2 rounded border"
            placeholder="Flight ID"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
            onClick={() => setFlightID("")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Land
          </button>
        </div>
      </form>
    </div>
  );
}
