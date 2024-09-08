const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { adminAccess } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware to check for admin role
const adminRoleMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
};

// Route for admin access to dashboard
router.get('/dashboard', authMiddleware, adminRoleMiddleware, adminAccess);

// Route to view all users (for admin use)
router.get('/users', authMiddleware, adminRoleMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// Route to manage user by ID (update user details)
router.put('/users/:id', authMiddleware, adminRoleMiddleware, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Failed to update user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
});

module.exports = router;
