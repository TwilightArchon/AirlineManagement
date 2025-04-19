'use client';

import { useState } from 'react';

export default function AddAirplaneForm() {
  const [formData, setFormData] = useState({
    airlineID: '',
    tail_num: '',
    seat_capacity: '',
    speed: '',
    locationID: '',
    plane_type: 'Boeing', // Default value
    maintenanced: false,
    model: '',
    neo: false
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Convert numeric fields and map to stored procedure parameter names
      const dataToSend = {
        ip_airlineID: formData.airlineID,
        ip_tail_num: formData.tail_num,
        ip_seat_capacity: formData.seat_capacity ? parseInt(formData.seat_capacity) : 0,
        ip_speed: formData.speed ? parseInt(formData.speed) : 0,
        ip_locationID: formData.locationID,
        ip_plane_type: formData.plane_type,
        ip_maintenanced: formData.maintenanced,
        ip_model: formData.model,
        ip_neo: formData.neo
      };

      console.log('Sending data to procedure:', dataToSend);

      // Send to the stored procedure API
      const response = await fetch('/api/database/procedure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          procedure: 'add_airplane',
          params: dataToSend
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`Success: Airplane added successfully!`);
        console.log('Procedure response:', data);
      } else {
        setError(`Error: ${data.message}`);
        console.error('Procedure error:', data);
      }
    } catch (error) {
      setError('Error: Failed to execute procedure');
      console.error('Procedure execution error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-4">Add New Airplane</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Airline ID */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="airlineID">
              Airline ID*
            </label>
            <input
              id="airlineID"
              name="airlineID"
              type="text"
              value={formData.airlineID}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Tail Number */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="tail_num">
              Tail Number*
            </label>
            <input
              id="tail_num"
              name="tail_num"
              type="text"
              value={formData.tail_num}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Seat Capacity */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="seat_capacity">
              Seat Capacity*
            </label>
            <input
              id="seat_capacity"
              name="seat_capacity"
              type="number"
              min="1"
              value={formData.seat_capacity}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Speed */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="speed">
              Speed*
            </label>
            <input
              id="speed"
              name="speed"
              type="number"
              min="1"
              value={formData.speed}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Location ID */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="locationID">
              Location ID*
            </label>
            <input
              id="locationID"
              name="locationID"
              type="text"
              value={formData.locationID}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Plane Type */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="plane_type">
              Plane Type*
            </label>
            <select
              id="plane_type"
              name="plane_type"
              value={formData.plane_type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="Boeing">Boeing</option>
              <option value="Airbus">Airbus</option>
            </select>
          </div>

          {/* Conditional fields based on plane type */}
          {formData.plane_type === 'Boeing' && (
            <>
              {/* Model */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="model">
                  Model*
                </label>
                <input
                  id="model"
                  name="model"
                  type="text"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Maintenanced */}
              <div className="flex items-center pt-6">
                <input
                  id="maintenanced"
                  name="maintenanced"
                  type="checkbox"
                  checked={formData.maintenanced}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="maintenanced" className="ml-2 block text-sm text-gray-900">
                  Maintenanced
                </label>
              </div>
            </>
          )}

          {/* NEO field for Airbus */}
          {formData.plane_type === 'Airbus' && (
            <div className="flex items-center pt-6">
              <input
                id="neo"
                name="neo"
                type="checkbox"
                checked={formData.neo}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="neo" className="ml-2 block text-sm text-gray-900">
                NEO
              </label>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md disabled:opacity-50"
          >
            {loading ? 'Adding Airplane...' : 'Add Airplane'}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-4 p-3 rounded-md bg-green-100 text-green-800">
          {result}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 rounded-md bg-red-100 text-red-800">
          {error}
        </div>
      )}
    </div>
  );
} 