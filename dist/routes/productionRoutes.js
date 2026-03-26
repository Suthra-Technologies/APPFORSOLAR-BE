"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductionStat_1 = require("../models/ProductionStat");
const router = (0, express_1.Router)();
// Current Production (Mock real-time logic with persistent record)
router.get('/', async (req, res) => {
    try {
        // Usually fetches real hardware invertor payload via Modbus TCP etc.
        const lastStat = await ProductionStat_1.ProductionStat.findOne().sort({ createdAt: -1 });
        let value = 52.4;
        if (lastStat) {
            value = lastStat.kwh + (Math.random() - 0.4) * 0.15;
        }
        const safeKwh = parseFloat(Math.max(0, value).toFixed(2));
        const newStat = new ProductionStat_1.ProductionStat({ kwh: safeKwh });
        await newStat.save();
        res.json({ success: true, productionKwh: safeKwh, timestamp: newStat.timestamp });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.default = router;
