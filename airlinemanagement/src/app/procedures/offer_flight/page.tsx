'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function OfferFlightPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    flightID: "",
    routeID: "",
    support_airline: "",
    support_tail: "",
    progress: "0",
    next_time: "",
    cost: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          procedure: 'offer_flight',
          params: {
            ip_flightID: form.flightID,
            ip_routeID: form.routeID,
            ip_support_airline: form.support_airline || null,
            ip_support_tail: form.support_tail || null,
            ip_progress: parseInt(form.progress) || 0,
            ip_next_time: form.next_time,
            ip_cost: parseInt(form.cost) || 0
          }
        }),
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setMessage("Flight offered successfully!");
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
      <h1 className="text-3xl font-bold mb-6">Procedure: Offer Flight</h1>
      
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
          <label className="block font-semibold mb-1">Flight ID</label>
          <input
            type="text"
            name="flightID"
            value={form.flightID}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Flight ID"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Route ID</label>
          <input
            type="text"
            name="routeID"
            value={form.routeID}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Route ID"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Airline ID (optional)</label>
          <input
            type="text"
            name="support_airline"
            value={form.support_airline}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Supporting Airline"
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Tail Number (optional)</label>
          <input
            type="text"
            name="support_tail"
            value={form.support_tail}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Supporting Tail Number"
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Progress</label>
          <input
            type="number"
            name="progress"
            value={form.progress}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Progress"
            min="0"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Next Time (HH:MM:SS)</label>
          <input
            type="time"
            name="next_time"
            value={form.next_time}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            step="1"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Cost</label>
          <input
            type="number"
            name="cost"
            value={form.cost}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Cost"
            min="0"
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
            Offer Flight
          </button>
        </div>
      </form>
    </div>
  );
}