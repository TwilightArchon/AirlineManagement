'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAirportPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    airportID: "",
    airport_name: "",
    city: "",
    state: "",
    country: "",
    locationID: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    
    const params = {
      ip_airportID: form.airportID,
      ip_airport_name: form.airport_name,
      ip_city: form.city,
      ip_state: form.state,
      ip_country: form.country,
      ip_locationID: form.locationID
    };

    try {
      const response = await fetch('/api/database/procedure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          procedure: 'add_airport',
          params
        }),
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setMessage("Airport added successfully!");
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
      <h1 className="text-3xl font-bold mb-6">Procedure: Add Airport</h1>
      
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
          <label className="block font-semibold mb-1">Airport ID (3 characters)</label>
          <input
            type="text"
            name="airportID"
            value={form.airportID}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Airport ID (e.g. ATL)"
            maxLength={3}
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Airport Name</label>
          <input
            type="text"
            name="airport_name"
            value={form.airport_name}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Airport Name"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="City"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">State</label>
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="State"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Country (3 characters)</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Country (e.g. USA)"
            maxLength={3}
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Location ID</label>
          <input
            type="text"
            name="locationID"
            value={form.locationID}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Location ID"
            required
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
            Add Airport
          </button>
        </div>
      </form>
    </div>
  );
}