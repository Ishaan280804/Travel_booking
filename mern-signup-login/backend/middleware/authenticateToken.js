const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    console.log('Incoming Headers:', req.headers); // Log headers for debugging
    
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.error('Authorization header missing');
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.error('Token missing in authorization header');
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;

