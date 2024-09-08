const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');
const adminOnly = require('../middleware/adminOnly');

// Define the routes and their handlers
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.post('/adminSignin', authController.adminAccess);

// Example protected route for admin dashboard
router.get('/admin/dashboard', authenticateToken, adminOnly, (req, res) => {
    // Admin dashboard logic here
    res.status(200).json({ message: 'Welcome to the admin dashboard!' });
});

module.exports = router;
