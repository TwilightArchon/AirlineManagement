'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function GrantOrRevokePilotLicensePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    personID: "",
    license: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

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
          procedure: 'grant_or_revoke_pilot_license',
          params: {
            ip_personID: form.personID,
            ip_license: form.license
          }
        }),
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setMessage("Pilot license status updated successfully!");
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
      <h1 className="text-3xl font-bold mb-6">Procedure: Grant or Revoke Pilot License</h1>
      
      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded shadow grid grid-cols-1 gap-4"
      >
        <div>
          <label className="block font-semibold mb-1">Pilot ID</label>
          <input
            type="text"
            name="personID"
            value={form.personID}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Pilot ID"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">License Type</label>
          <select
            name="license"
            value={form.license}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            required
          >
            <option value="">Select License Type</option>
            <option value="Boeing">Boeing</option>
            <option value="Airbus">Airbus</option>
            <option value="Other">Other</option>
          </select>
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
            Grant/Revoke License
          </button>
        </div>
      </form>
    </div>
  );
}