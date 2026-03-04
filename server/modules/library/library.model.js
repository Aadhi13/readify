const mongoose = require('mongoose');

const userBookSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        googleBooksId: {
            type: String,
            required: true,
        },
        bookSnapshot: {
            title: { type: String, default: 'Untitled' },
            author: { type: String, default: 'Unknown' },
            cover: { type: String, default: '' },
            totalPages: { type: Number, default: 0 },
        },
        shelf: {
            type: String,
            enum: ['wantToRead', 'reading', 'completed'],
            default: 'wantToRead',
        },
        currentPage: {
            type: Number,
            default: 0,
            min: 0,
        },
        moodTags: [{ type: String, trim: true }],
        startedAt: { type: Date },
        completedAt: { type: Date },
        rating: {
            type: Number,
            min: 0,
            max: 5,
        },
        review: {
            type: String,
            maxlength: 2000,
        },
    },
    { timestamps: true }
);

// Compound index: one user can only have a book once
userBookSchema.index({ userId: 1, googleBooksId: 1 }, { unique: true });

module.exports = mongoose.model('UserBook', userBookSchema);
