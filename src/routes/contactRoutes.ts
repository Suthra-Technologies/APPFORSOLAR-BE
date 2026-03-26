import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

// Schema for Contact Messages if we want to save them
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Public endpoint to handle contact form requests
 *     tags: [Public]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message received successfully
 */
router.post('/', async (req, res) => {
    try {
        const payload = req.body;
        const newContact = new Contact(payload);
        await newContact.save();
        res.status(200).json({ success: true, message: 'Message recorded' });
    } catch (error) {
        console.error('Contact API Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
