// MongoDB schema for booking data using Mongoose
const mongoose = require('mongoose');

// Define the booking schema with validation rules
const bookingSchema = new mongoose.Schema({
  // Customer name - required field
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  // Vehicle number - required field
  vehicle: {
    type: String,
    required: [true, 'Vehicle number is required'],
    trim: true,
    uppercase: true,
    maxlength: [20, 'Vehicle number cannot exceed 20 characters']
  },
  
  // Service type - required field
  service: {
    type: String,
    required: [true, 'Service type is required'],
    enum: {
      values: ['Oil Change', 'Brake Service', 'Tire Rotation', 'Engine Tune-up', 'General Inspection'],
      message: 'Invalid service type'
    }
  },
  
  // Booking status - defaults to 'Pending'
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  
  // Booking creation date - auto-generated
  date: {
    type: Date,
    default: Date.now
  }
}, {
  // Add timestamps for createdAt and updatedAt
  timestamps: true
});

// Create and export the Booking model
module.exports = mongoose.model('Booking', bookingSchema);