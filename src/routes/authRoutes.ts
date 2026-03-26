import { Router } from 'express';
import { User } from '../models/User';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login for Admin Panel integration access
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful returning fake JWT token
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    // In production, use bcrypt and jwt here
    res.json({ success: true, token: 'fake-jwt-token-for-demo', user: { email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create initial admin if none exists
/**
 * @swagger
 * /auth/setup:
 *   post:
 *     summary: Initial admin setup (only works if no users exist)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Admin user created
 *       400:
 *         description: Admin already exists
 */
router.post('/setup', async (req, res) => {
  try {
    const adminCount = await User.countDocuments();
    if (adminCount > 0) return res.status(400).json({ message: 'Admin already setup' });

    const admin = new User({ email: 'admin@solar.com', password: 'password123' });
    await admin.save();
    res.json({ success: true, message: 'Admin setup' });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

export default router;
