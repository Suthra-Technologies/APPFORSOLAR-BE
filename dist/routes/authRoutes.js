"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        // In production, use bcrypt and jwt here
        res.json({ success: true, token: 'fake-jwt-token-for-demo', user: { email: user.email, role: user.role } });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
// Create initial admin if none exists
router.post('/setup', async (req, res) => {
    try {
        const adminCount = await User_1.User.countDocuments();
        if (adminCount > 0)
            return res.status(400).json({ message: 'Admin already setup' });
        const admin = new User_1.User({ email: 'admin@solar.com', password: 'password123' });
        await admin.save();
        res.json({ success: true, message: 'Admin setup' });
    }
    catch (e) {
        res.status(500).json({ success: false });
    }
});
exports.default = router;
