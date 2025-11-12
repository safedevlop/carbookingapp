// API routes for booking operations
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
  try {
    // Extract booking data from request body
    const { name, vehicle, service } = req.body;
    
    // Validate required fields
    if (!name || !vehicle || !service) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, vehicle, service) are required'
      });
    }

    // Create new booking document
    const booking = new Booking({
      name: name.trim(),
      vehicle: vehicle.trim().toUpperCase(),
      service
    });

    // Save booking to MongoDB
    const savedBooking = await booking.save();
    
    // Return success response
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: savedBooking
    });

  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    // Handle other errors
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /api/bookings - Get all bookings (for admin use)
router.get('/', async (req, res) => {
  try {
    // Fetch all bookings sorted by creation date (newest first)
    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });

  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// PUT /api/bookings/:id - Update booking status (for admin use)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status value
    const validStatuses = ['Pending', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: Pending, In Progress, or Completed'
      });
    }

    // Update booking status
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: updatedBooking
    });

  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;