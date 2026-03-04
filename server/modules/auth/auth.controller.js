const jwt = require('jsonwebtoken');
const User = require('./auth.model');
const { JWT_SECRET } = require('../../config/env');
const { sendSuccess, sendError } = require('../../utils/response');
const asyncHandler = require('../../utils/asyncHandler');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return sendError(res, 400, 'User with this email already exists');
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    sendSuccess(res, 201, 'User registered successfully', {
        user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
        token,
    });
});

// @desc    Login user
// @route   POST /api/auth/login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return sendError(res, 400, 'Please provide email and password');
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return sendError(res, 401, 'Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return sendError(res, 401, 'Invalid credentials');
    }

    const token = generateToken(user._id);

    sendSuccess(res, 200, 'Login successful', {
        user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
        token,
    });
});

// @desc    Get current user
// @route   GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
    sendSuccess(res, 200, 'User fetched', {
        user: { id: req.user._id, name: req.user.name, email: req.user.email, avatar: req.user.avatar },
    });
});

module.exports = { register, login, getMe };
