import apiClient from './client';

export const getLibrary = (shelf) =>
    apiClient.get('/library', { params: shelf ? { shelf } : {} });

export const addBookToLibrary = (bookData) =>
    apiClient.post('/library', bookData);

export const updateProgress = (id, currentPage) =>
    apiClient.patch(`/library/${id}/progress`, { currentPage });

export const moveShelf = (id, shelf) =>
    apiClient.patch(`/library/${id}/shelf`, { shelf });

export const updateReview = (id, data) =>
    apiClient.patch(`/library/${id}/review`, data);

export const removeFromLibrary = (id) =>
    apiClient.delete(`/library/${id}`);
