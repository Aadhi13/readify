const UserBook = require('../library/library.model');
const { sendSuccess } = require('../../utils/response');
const asyncHandler = require('../../utils/asyncHandler');

// @desc    Get reading overview stats
// @route   GET /api/stats/overview
const getOverview = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const [totalBooks, reading, completed, wantToRead, pagesRead, avgRating] = await Promise.all([
        UserBook.countDocuments({ userId }),
        UserBook.countDocuments({ userId, shelf: 'reading' }),
        UserBook.countDocuments({ userId, shelf: 'completed' }),
        UserBook.countDocuments({ userId, shelf: 'wantToRead' }),
        UserBook.aggregate([
            { $match: { userId } },
            { $group: { _id: null, totalPages: { $sum: '$currentPage' } } },
        ]),
        UserBook.aggregate([
            { $match: { userId, rating: { $exists: true, $ne: null } } },
            { $group: { _id: null, avg: { $avg: '$rating' } } },
        ]),
    ]);

    sendSuccess(res, 200, 'Stats fetched', {
        totalBooks,
        reading,
        completed,
        wantToRead,
        totalPagesRead: pagesRead[0]?.totalPages || 0,
        averageRating: avgRating[0]?.avg ? Math.round(avgRating[0].avg * 10) / 10 : null,
    });
});

// @desc    Get reading history (books completed over time)
// @route   GET /api/stats/reading-history
const getReadingHistory = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const history = await UserBook.aggregate([
        { $match: { userId, shelf: 'completed', completedAt: { $exists: true } } },
        {
            $group: {
                _id: {
                    year: { $year: '$completedAt' },
                    month: { $month: '$completedAt' },
                },
                count: { $sum: 1 },
                pagesRead: { $sum: '$currentPage' },
            },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
        {
            $project: {
                _id: 0,
                year: '$_id.year',
                month: '$_id.month',
                booksCompleted: '$count',
                pagesRead: 1,
            },
        },
    ]);

    sendSuccess(res, 200, 'Reading history fetched', { history });
});

module.exports = { getOverview, getReadingHistory };
