const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup Logic
exports.signup = async (req, res) => {
    const { name, email, password, role = 'user' } = req.body; // Default role to 'user'

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token and user info to the client
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
            token
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};

// Signin Logic
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token and user info to the client
        res.status(200).json({
            message: 'Logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token
        });

    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Server error during signin' });
    }
};

// Admin Signin Logic
exports.adminSignin = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log(`Attempting to sign in with email: ${email}`);

        // Check if user exists and is an admin
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (user.role !== 'admin') {
            console.log('User is not an admin');
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token and user info to the client
        res.status(200).json({
            message: 'Logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token
        });

    } catch (error) {
        console.error('Admin signin error:', error);
        res.status(500).json({ message: 'Server error during admin signin' });
    }
};


// Admin-only Access Logic
exports.adminAccess = async (req, res) => {
    try {
        // Safeguard against undefined user object
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: 'Access denied. No valid user role found' });
        }

        if (req.user.role === 'admin') {
            res.status(200).json({ message: 'Welcome Admin' });
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    } catch (error) {
        console.error('Admin access error:', error);
        res.status(500).json({ message: 'Server error during admin access' });
    }
};
