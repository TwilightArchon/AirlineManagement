'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type OfferFlightFormFields =
  | "flightID"
  | "routeID"
  | "supportAirline"
  | "progress"
  | "nextTime"
  | "supportTail"
  | "cost";

type OfferFlightForm = Record<OfferFlightFormFields, string>;

export default function OfferFlightPage() {
  const router = useRouter();
  const [form, setForm] = useState<OfferFlightForm>({
    flightID: "",
    routeID: "",
    supportAirline: "",
    progress: "",
    nextTime: "",
    supportTail: "",
    cost: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name as OfferFlightFormFields]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Offering flight:", form);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Procedure: Offer Flight</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded shadow grid grid-cols-3 gap-4"
      >
        {([
          ["Flight ID", "flightID"],
          ["Route ID", "routeID"],
          ["Support Airline", "supportAirline"],
          ["Progress", "progress"],
          ["Next Time", "nextTime"],
          ["Support Tail", "supportTail"],
          ["Cost", "cost"]
        ] as [string, OfferFlightFormFields][]).map(([label, name]) => (
          <div key={name} className="col-span-1">
            <label className="block font-semibold mb-1">{label}</label>
            <input
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full p-2 rounded border"
              placeholder={label}
            />
          </div>
        ))}

        <div className="col-span-3 flex justify-between mt-4">
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
            Add
          </button>
        </div>
      </form>
    </div>
  );
}