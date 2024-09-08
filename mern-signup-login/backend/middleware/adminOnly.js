const authenticateToken = require('./authenticateToken');

const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') return res.sendStatus(403); // Forbidden if not admin
    next();
};

module.exports = adminOnly;
