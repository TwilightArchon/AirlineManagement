'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RetireFlightPage() {
  const router = useRouter();
  const [flightID, setFlightID] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlightID(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Retiring flight:", flightID);
    // API call logic here
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Procedure: Retire Flight</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded shadow"
      >
        <div className="mb-4">
          <label className="block font-semibold mb-1">Flight ID</label>
          <input
            type="text"
            name="flightID"
            value={flightID}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Enter flight ID"
          />
        </div>

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
            Retire
          </button>
        </div>
      </form>
    </div>
  );
}
