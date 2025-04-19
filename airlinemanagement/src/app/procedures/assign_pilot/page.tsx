'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AssignPilotPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    flightID: "",
    personID: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Assigning pilot:", form);
    // axios.post('/api/assign-pilot', form)
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Procedure: Assign Pilot</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded shadow grid grid-cols-1 gap-4"
      >
        <div>
          <label className="block font-semibold mb-1">ip_flightID</label>
          <input
            type="text"
            name="flightID"
            value={form.flightID}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Flight ID"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">ip_personID</label>
          <input
            type="text"
            name="personID"
            value={form.personID}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Person ID"
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
            Assign
          </button>
        </div>
      </form>
    </div>
  );
}
