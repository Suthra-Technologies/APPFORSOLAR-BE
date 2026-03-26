import { Router } from 'express';
import { Booking } from '../models/Booking';

const router = Router();

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Submit a new booking form
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking received successfully
 *   get:
 *     summary: Retrieve historical bookings
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: All bookings payload
 */
// Submit new booking (frontend user)
router.post('/', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();

    // Trigger websocket event if active
    if ((global as any).io) {
      (global as any).io.emit('new_booking', newBooking);
    }
    
    res.status(201).json({ success: true, booking: newBooking });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Admin fetching all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;
