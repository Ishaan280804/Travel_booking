const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // assuming user id is available in req.user
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied.' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

router.get('/admin', isAdmin, async (req, res) => {
  // Admin-specific logic here
  res.json({ message: 'Admin access granted' });
});

module.exports = router;
