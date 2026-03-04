/**
 * Format a number as percentage
 */
export const toPercent = (current, total) => {
    if (!total || total === 0) return 0;
    return Math.min(Math.round((current / total) * 100), 100);
};

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

/**
 * Get month name from month number
 */
export const monthName = (monthNum) => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return months[monthNum - 1] || '';
};

/**
 * Truncate text to a given length
 */
export const truncate = (str, len = 100) => {
    if (!str) return '';
    return str.length > len ? str.substring(0, len) + '…' : str;
};
