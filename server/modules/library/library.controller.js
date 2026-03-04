const libraryService = require('./library.service');
const { sendSuccess, sendError } = require('../../utils/response');
const asyncHandler = require('../../utils/asyncHandler');

// @desc    Add book to library
// @route   POST /api/library
const addBook = asyncHandler(async (req, res) => {
    try {
        const userBook = await libraryService.addBook(req.user._id, req.body);
        sendSuccess(res, 201, 'Book added to library', { userBook });
    } catch (err) {
        sendError(res, err.status || 500, err.message);
    }
});

// @desc    Get books by shelf (or all)
// @route   GET /api/library?shelf=reading
const getBooks = asyncHandler(async (req, res) => {
    const books = await libraryService.getByShelf(req.user._id, req.query.shelf);
    sendSuccess(res, 200, 'Library fetched', { books });
});

// @desc    Update reading progress
// @route   PATCH /api/library/:id/progress
const updateProgress = asyncHandler(async (req, res) => {
    try {
        const userBook = await libraryService.updateProgress(req.user._id, req.params.id, req.body.currentPage);
        sendSuccess(res, 200, 'Progress updated', { userBook });
    } catch (err) {
        sendError(res, err.status || 500, err.message);
    }
});

// @desc    Move book to different shelf
// @route   PATCH /api/library/:id/shelf
const moveShelf = asyncHandler(async (req, res) => {
    try {
        const userBook = await libraryService.moveShelf(req.user._id, req.params.id, req.body.shelf);
        sendSuccess(res, 200, 'Shelf updated', { userBook });
    } catch (err) {
        sendError(res, err.status || 500, err.message);
    }
});

// @desc    Update rating/review
// @route   PATCH /api/library/:id/review
const updateReview = asyncHandler(async (req, res) => {
    try {
        const userBook = await libraryService.updateReview(req.user._id, req.params.id, req.body);
        sendSuccess(res, 200, 'Review updated', { userBook });
    } catch (err) {
        sendError(res, err.status || 500, err.message);
    }
});

// @desc    Remove book from library
// @route   DELETE /api/library/:id
const removeBook = asyncHandler(async (req, res) => {
    try {
        await libraryService.removeBook(req.user._id, req.params.id);
        sendSuccess(res, 200, 'Book removed from library');
    } catch (err) {
        sendError(res, err.status || 500, err.message);
    }
});

module.exports = { addBook, getBooks, updateProgress, moveShelf, updateReview, removeBook };
