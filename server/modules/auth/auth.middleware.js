const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/env');
const { sendError } = require('../../utils/response');
const User = require('./auth.model');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return sendError(res, 401, 'Not authorized — no token provided');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return sendError(res, 401, 'Not authorized — user not found');
        }

        next();
    } catch (error) {
        return sendError(res, 401, 'Not authorized — invalid token');
    }
};

module.exports = { protect };
