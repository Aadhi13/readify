const express = require('express');
const router = express.Router();
const { protect } = require('../auth/auth.middleware');
const {
    addBook,
    getBooks,
    updateProgress,
    moveShelf,
    updateReview,
    removeBook,
} = require('./library.controller');

// All library routes are protected
router.use(protect);

router.route('/').get(getBooks).post(addBook);
router.patch('/:id/progress', updateProgress);
router.patch('/:id/shelf', moveShelf);
router.patch('/:id/review', updateReview);
router.delete('/:id', removeBook);

module.exports = router;
