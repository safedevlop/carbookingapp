// Main React component for Automobile Service Booking System
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // State management for form data and UI feedback
  const [formData, setFormData] = useState({
    name: '',
    vehicle: '',
    service: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes - updates form state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission - sends booking data to backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // POST request to backend API using Axios
      const response = await axios.post('http://localhost:5000/api/bookings', formData);
      
      // Show success message and reset form
      setMessage('Booking submitted successfully! We will contact you soon.');
      setFormData({ name: '', vehicle: '', service: '' });
    } catch (error) {
      // Handle API errors
      setMessage('Error submitting booking. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Main container with responsive design using TailwindCSS
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header section with title and description */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🚗 Auto Service Booking
          </h1>
          <p className="text-gray-600">
            Book your vehicle service appointment online
          </p>
        </div>

        {/* Booking form card with TailwindCSS styling */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Name input field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Vehicle Number input field */}
            <div>
              <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Number
              </label>
              <input
                type="text"
                id="vehicle"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., ABC-1234"
              />
            </div>

            {/* Service Type dropdown selection */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                Service Type
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a service</option>
                <option value="Oil Change">Oil Change</option>
                <option value="Brake Service">Brake Service</option>
                <option value="Tire Rotation">Tire Rotation</option>
                <option value="Engine Tune-up">Engine Tune-up</option>
                <option value="General Inspection">General Inspection</option>
              </select>
            </div>

            {/* Submit button with loading state */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {isLoading ? 'Submitting...' : 'Book Service'}
            </button>
          </form>

          {/* Success/Error message display */}
          {message && (
            <div className={`mt-4 p-3 rounded-md ${
              message.includes('successfully') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Footer information */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Service hours: Monday - Friday, 8:00 AM - 6:00 PM</p>
          <p>Contact: (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
}

export default App;