'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAirplanePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    airlineID: "",
    tail_num: "",
    seat_capacity: "",
    speed: "",
    locationID: "",
    plane_type: "",
    maintenanced: false,
    model: "",
    neo: null
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm({ ...form, [name]: checked });
    } else if (name === 'plane_type') {
      // If Boeing is selected, set neo to null
      if (value === 'Boeing') {
        setForm({ ...form, [name]: value, neo: null });
      } else {
        setForm({ ...form, [name]: value });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    
    // Convert numeric values
    const params = {
      ip_airlineID: form.airlineID,
      ip_tail_num: form.tail_num,
      ip_seat_capacity: parseInt(form.seat_capacity) || 0,
      ip_speed: parseInt(form.speed) || 0,
      ip_locationID: form.locationID,
      ip_plane_type: form.plane_type,
      ip_maintenanced: form.maintenanced,
      ip_model: form.model || null,
      ip_neo: form.neo
    };

    try {
      const response = await fetch('/api/database/procedure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          procedure: 'add_airplane',
          params
        }),
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setMessage("Airplane added successfully!");
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
      <h1 className="text-3xl font-bold mb-6">Procedure: Add Airplane</h1>
      
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
          <label className="block font-semibold mb-1">Airline ID</label>
          <input
            type="text"
            name="airlineID"
            value={form.airlineID}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Airline ID"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Tail Number</label>
          <input
            type="text"
            name="tail_num"
            value={form.tail_num}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Tail Number"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Seat Capacity</label>
          <input
            type="number"
            name="seat_capacity"
            value={form.seat_capacity}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Seat Capacity"
            min="1"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Speed</label>
          <input
            type="number"
            name="speed"
            value={form.speed}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Speed"
            min="1"
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
        
        <div>
          <label className="block font-semibold mb-1">Plane Type</label>
          <select
            name="plane_type"
            value={form.plane_type}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            required
          >
            <option value="">Select Plane Type</option>
            <option value="Boeing">Boeing</option>
            <option value="Airbus">Airbus</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        {form.plane_type === 'Boeing' && (
          <>
            <div>
              <label className="block font-semibold mb-1">Boeing Model</label>
              <input
                type="text"
                name="model"
                value={form.model}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                placeholder="Boeing Model"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="maintenanced"
                checked={form.maintenanced}
                onChange={handleChange}
                className="mr-2"
              />
              <label>Maintenance Status</label>
            </div>
          </>
        )}
        
        {form.plane_type === 'Airbus' && (
          <div className="flex items-center">
            <input
              type="checkbox"
              name="neo"
              checked={form.neo === null ? false : form.neo}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Neo Status</label>
          </div>
        )}

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
            Add Airplane
          </button>
        </div>
      </form>
    </div>
  );
}