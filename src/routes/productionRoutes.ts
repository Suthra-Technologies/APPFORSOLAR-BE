import { Router } from 'express';
import { ProductionStat } from '../models/ProductionStat';

const router = Router();

/**
 * @swagger
 * /production:
 *   get:
 *     summary: Retrieve real-time production stats
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Current solar generation payload
 */
// Current Production (Mock real-time logic with persistent record)
router.get('/', async (req, res) => {
  try {
    // Usually fetches real hardware invertor payload via Modbus TCP etc.
    const lastStat = await ProductionStat.findOne().sort({ createdAt: -1 });
    let value = 52.4; 
    if (lastStat) {
        value = lastStat.kwh + (Math.random() - 0.4) * 0.15;
    }
    const safeKwh = parseFloat(Math.max(0, value).toFixed(2));

    const newStat = new ProductionStat({ kwh: safeKwh });
    await newStat.save();

    res.json({ success: true, productionKwh: safeKwh, timestamp: newStat.timestamp });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
