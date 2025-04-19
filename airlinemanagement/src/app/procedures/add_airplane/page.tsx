'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type AirplaneFormField =
  | "airlineID"
  | "tailNum"
  | "seatCap"
  | "speed"
  | "locationID"
  | "planeType"
  | "maintained"
  | "model"
  | "neo";

type AirplaneForm = Record<AirplaneFormField, string>;

export default function AddAirplanePage() {
  const router = useRouter();
  const [form, setForm] = useState<AirplaneForm>({
    airlineID: "",
    tailNum: "",
    seatCap: "",
    speed: "",
    locationID: "",
    planeType: "",
    maintained: "",
    model: "",
    neo: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name as AirplaneFormField]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Adding airplane:", form);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Procedure: Add Airplane</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded shadow grid grid-cols-2 gap-4"
      >
        {([
          ["Airline ID", "airlineID"],
          ["Tail Num", "tailNum"],
          ["Seat Cap", "seatCap"],
          ["Speed", "speed"],
          ["Location ID", "locationID"],
          ["Plane Type", "planeType"],
          ["Maintained", "maintained"],
          ["Model", "model"],
          ["Neo", "neo"]
        ] as [string, AirplaneFormField][]).map(([label, name]) => (
          <div key={name}>
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

        <div className="col-span-2 flex justify-between mt-4">
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