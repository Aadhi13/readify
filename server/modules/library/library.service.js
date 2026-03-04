const UserBook = require('./library.model');

/**
 * Add a book to the user's library
 */
const addBook = async (userId, bookData) => {
    const { googleBooksId, title, author, cover, totalPages, shelf } = bookData;

    // Check if book already exists in user's library
    const existing = await UserBook.findOne({ userId, googleBooksId });
    if (existing) {
        throw { status: 400, message: 'Book is already in your library' };
    }

    const userBook = await UserBook.create({
        userId,
        googleBooksId,
        bookSnapshot: { title, author, cover, totalPages },
        shelf: shelf || 'wantToRead',
        startedAt: shelf === 'reading' ? new Date() : undefined,
    });

    return userBook;
};

/**
 * Update reading progress (current page)
 */
const updateProgress = async (userId, userBookId, currentPage) => {
    const userBook = await UserBook.findOne({ _id: userBookId, userId });
    if (!userBook) {
        throw { status: 404, message: 'Book not found in your library' };
    }

    userBook.currentPage = currentPage;

    // Auto-move to reading if on wantToRead
    if (userBook.shelf === 'wantToRead' && currentPage > 0) {
        userBook.shelf = 'reading';
        userBook.startedAt = userBook.startedAt || new Date();
    }

    // Auto-complete if current page reaches total
    if (userBook.bookSnapshot.totalPages > 0 && currentPage >= userBook.bookSnapshot.totalPages) {
        userBook.shelf = 'completed';
        userBook.completedAt = new Date();
    }

    await userBook.save();
    return userBook;
};

/**
 * Move book to a different shelf
 */
const moveShelf = async (userId, userBookId, newShelf) => {
    const userBook = await UserBook.findOne({ _id: userBookId, userId });
    if (!userBook) {
        throw { status: 404, message: 'Book not found in your library' };
    }

    userBook.shelf = newShelf;

    if (newShelf === 'reading' && !userBook.startedAt) {
        userBook.startedAt = new Date();
    }
    if (newShelf === 'completed') {
        userBook.completedAt = new Date();
        userBook.currentPage = userBook.bookSnapshot.totalPages || userBook.currentPage;
    }

    await userBook.save();
    return userBook;
};

/**
 * Get books by shelf for a user
 */
const getByShelf = async (userId, shelf) => {
    const filter = { userId };
    if (shelf) filter.shelf = shelf;
    return UserBook.find(filter).sort({ updatedAt: -1 });
};

/**
 * Remove a book from the library
 */
const removeBook = async (userId, userBookId) => {
    const userBook = await UserBook.findOneAndDelete({ _id: userBookId, userId });
    if (!userBook) {
        throw { status: 404, message: 'Book not found in your library' };
    }
    return userBook;
};

/**
 * Update rating and review
 */
const updateReview = async (userId, userBookId, { rating, review, moodTags }) => {
    const userBook = await UserBook.findOne({ _id: userBookId, userId });
    if (!userBook) {
        throw { status: 404, message: 'Book not found in your library' };
    }

    if (rating !== undefined) userBook.rating = rating;
    if (review !== undefined) userBook.review = review;
    if (moodTags !== undefined) userBook.moodTags = moodTags;

    await userBook.save();
    return userBook;
};

module.exports = { addBook, updateProgress, moveShelf, getByShelf, removeBook, updateReview };
