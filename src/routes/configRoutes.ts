import { Router } from 'express';
import { SiteConfig } from '../models/SiteConfig';

const router = Router();

/**
 * @swagger
 * /config:
 *   get:
 *     summary: Get site configuration
 *     tags: [Config]
 *     responses:
 *       200:
 *         description: Site configuration fetched successfully
 */
// GET Application Configuration payload overarching everything
router.get('/', async (req, res) => {
  try {
    let configDoc = await SiteConfig.findOne();
    if (!configDoc) {
      configDoc = new SiteConfig({
        configData: {} // Handled initially via frontend defaulting fallbacks during zero-hour loading
      });
      await configDoc.save();
    }
    res.json({ success: true, config: configDoc.configData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Config Recovery Error' });
  }
});

/**
 * @swagger
 * /config:
 *   put:
 *     summary: Update site configuration
 *     tags: [Config]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Config updated
 */
// PUT Deep-merge dynamic configurations over the existing Mixed schema
router.put('/', async (req, res) => {
  try {
    let configDoc = await SiteConfig.findOne();
    if (!configDoc) {
        configDoc = new SiteConfig({ configData: req.body });
    } else {
        configDoc.configData = req.body;
        configDoc.markModified('configData');
    }
    await configDoc.save();
    res.json({ success: true, config: configDoc.configData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Config Modification Error' });
  }
});

export default router;
