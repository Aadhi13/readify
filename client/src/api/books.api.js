import apiClient from './client';

export const searchBooks = (query, startIndex = 0) =>
    apiClient.get('/books/search', { params: { q: query, startIndex } });

export const getBookById = (id) => apiClient.get(`/books/${id}`);
