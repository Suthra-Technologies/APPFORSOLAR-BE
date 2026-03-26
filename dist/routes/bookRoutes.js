"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Booking_1 = require("../models/Booking");
const router = (0, express_1.Router)();
// Submit new booking (frontend user)
router.post('/', async (req, res) => {
    try {
        const newBooking = new Booking_1.Booking(req.body);
        await newBooking.save();
        // Trigger websocket event if active
        if (global.io) {
            global.io.emit('new_booking', newBooking);
        }
        res.status(201).json({ success: true, booking: newBooking });
    }
    catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});
// Admin fetching all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking_1.Booking.find().sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});
exports.default = router;
