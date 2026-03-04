import apiClient from './client';

export const getOverview = () => apiClient.get('/stats/overview');
export const getReadingHistory = () => apiClient.get('/stats/reading-history');
