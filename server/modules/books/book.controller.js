const axios = require('axios');
const { GOOGLE_BOOKS_API_KEY } = require('../../config/env');
const { sendSuccess, sendError } = require('../../utils/response');
const asyncHandler = require('../../utils/asyncHandler');

// @desc    Search books via Google Books API
// @route   GET /api/books/search?q=query&startIndex=0&maxResults=10
const searchBooks = asyncHandler(async (req, res) => {
    const { q, startIndex = 0, maxResults = 12 } = req.query;

    if (!q) {
        return sendError(res, 400, 'Search query is required');
    }

    const url = 'https://www.googleapis.com/books/v1/volumes';
    const params = {
        q,
        startIndex: Number(startIndex),
        maxResults: Math.min(Number(maxResults), 40), // Google caps at 40
    };
    if (GOOGLE_BOOKS_API_KEY) params.key = GOOGLE_BOOKS_API_KEY;

    const { data } = await axios.get(url, { params });

    // Normalize the response to only what we need
    const books = (data.items || []).map((item) => {
        const v = item.volumeInfo;
        return {
            googleBooksId: item.id,
            title: v.title || 'Untitled',
            authors: v.authors || ['Unknown'],
            cover: v.imageLinks?.thumbnail?.replace('http:', 'https:') || '',
            totalPages: v.pageCount || 0,
            publishedDate: v.publishedDate || '',
            description: v.description || '',
            categories: v.categories || [],
            averageRating: v.averageRating || null,
        };
    });

    sendSuccess(res, 200, 'Books fetched', {
        totalItems: data.totalItems || 0,
        books,
    });
});

// @desc    Get single book details by Google Books ID
// @route   GET /api/books/:id
const getBookById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const url = `https://www.googleapis.com/books/v1/volumes/${id}`;
    const params = {};
    if (GOOGLE_BOOKS_API_KEY) params.key = GOOGLE_BOOKS_API_KEY;

    const { data } = await axios.get(url, { params });
    const v = data.volumeInfo;

    const book = {
        googleBooksId: data.id,
        title: v.title || 'Untitled',
        authors: v.authors || ['Unknown'],
        cover: v.imageLinks?.thumbnail?.replace('http:', 'https:') || '',
        totalPages: v.pageCount || 0,
        publishedDate: v.publishedDate || '',
        description: v.description || '',
        categories: v.categories || [],
        averageRating: v.averageRating || null,
    };

    sendSuccess(res, 200, 'Book fetched', { book });
});

module.exports = { searchBooks, getBookById };
