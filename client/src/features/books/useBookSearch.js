import { useState, useEffect, useCallback } from 'react';
import { searchBooks } from '../../api/books.api';

export default function useBookSearch() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);

    const search = useCallback(async (q, startIndex = 0) => {
        if (!q.trim()) {
            setBooks([]);
            setTotalItems(0);
            return;
        }
        setLoading(true);
        try {
            const { data } = await searchBooks(q, startIndex);
            setBooks(data.data.books);
            setTotalItems(data.data.totalItems);
        } catch {
            setBooks([]);
        } finally {
            setLoading(false);
        }
    }, []);

    return { query, setQuery, books, loading, totalItems, search };
}
