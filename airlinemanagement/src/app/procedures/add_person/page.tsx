'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPersonPage() {
  const router = useRouter();
  const [personType, setPersonType] = useState<'passenger' | 'pilot' | ''>('');
  const [form, setForm] = useState({
    personID: "",
    first_name: "",
    last_name: "",
    locationID: "",
    taxID: "",
    experience: "",
    miles: "",
    funds: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePersonTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPersonType(e.target.value as 'passenger' | 'pilot' | '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    
    // Build params based on the person type
    const params: Record<string, any> = {
      ip_personID: form.personID,
      ip_first_name: form.first_name,
      ip_last_name: form.last_name || null,
      ip_locationID: form.locationID
    };
    
    // Add specific fields based on person type
    if (personType === 'pilot') {
      params.ip_taxID = form.taxID;
      params.ip_experience = parseInt(form.experience) || 0;
      params.ip_miles = null;
      params.ip_funds = null;
    } else if (personType === 'passenger') {
      params.ip_taxID = null;
      params.ip_experience = null;
      params.ip_miles = parseInt(form.miles) || 0;
      params.ip_funds = parseInt(form.funds) || 0;
    }

    try {
      const response = await fetch('/api/database/procedure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          procedure: 'add_person',
          params
        }),
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setMessage("Person added successfully!");
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
      <h1 className="text-3xl font-bold mb-6">Procedure: Add Person</h1>
      
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
          <label className="block font-semibold mb-1">Person Type</label>
          <select
            value={personType}
            onChange={handlePersonTypeChange}
            className="w-full p-2 rounded border"
            required
          >
            <option value="">Select Person Type</option>
            <option value="passenger">Passenger</option>
            <option value="pilot">Pilot</option>
          </select>
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Person ID</label>
          <input
            type="text"
            name="personID"
            value={form.personID}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Person ID"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">First Name</label>
          <input
            type="text"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="First Name"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Last Name"
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
        
        {personType === 'pilot' && (
          <>
            <div>
              <label className="block font-semibold mb-1">Tax ID</label>
              <input
                type="text"
                name="taxID"
                value={form.taxID}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                placeholder="Tax ID"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Experience</label>
              <input
                type="number"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                placeholder="Experience"
                min="0"
                required
              />
            </div>
          </>
        )}
        
        {personType === 'passenger' && (
          <>
            <div>
              <label className="block font-semibold mb-1">Miles</label>
              <input
                type="number"
                name="miles"
                value={form.miles}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                placeholder="Miles"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Funds</label>
              <input
                type="number"
                name="funds"
                value={form.funds}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                placeholder="Funds"
                min="0"
                required
              />
            </div>
          </>
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
            disabled={!personType}
          >
            Add Person
          </button>
        </div>
      </form>
    </div>
  );
}