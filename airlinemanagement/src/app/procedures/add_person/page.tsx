'use client';

import React, { useState } from "react";
type PersonFormField =
  | "personID"
  | "firstName"
  | "lastName"
  | "locationID"
  | "taxID"
  | "experience"
  | "miles"
  | "funds";

type PersonForm = Record<PersonFormField, string>;

export default function AddPersonPage() {
  const [form, setForm] = useState<PersonForm>({
    personID: "",
    firstName: "",
    lastName: "",
    locationID: "",
    taxID: "",
    experience: "",
    miles: "",
    funds: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name as PersonFormField]: value }); // ✅ 类型断言修复
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Adding person:", form);
    // axios.post('/api/person', form)
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Procedure: Add Person</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded shadow grid grid-cols-3 gap-4"
      >
        {([
          ["Person ID", "personID"],
          ["First Name", "firstName"],
          ["Last Name", "lastName"],
          ["Location ID", "locationID"],
          ["Tax ID", "taxID"],
          ["Experience", "experience"],
          ["Miles", "miles"],
          ["Funds", "funds"]
        ] as [string, PersonFormField][]).map(([label, name]) => (
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
            onClick={() =>
              setForm({
                personID: "",
                firstName: "",
                lastName: "",
                locationID: "",
                taxID: "",
                experience: "",
                miles: "",
                funds: ""
              })
            }
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