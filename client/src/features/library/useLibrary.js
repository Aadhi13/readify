import { useState, useEffect, useCallback } from 'react';
import { getLibrary, updateProgress, moveShelf, removeFromLibrary } from '../../api/library.api';

export default function useLibrary() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeShelf, setActiveShelf] = useState(null); // null = all

    const fetchBooks = useCallback(async (shelf) => {
        setLoading(true);
        try {
            const { data } = await getLibrary(shelf);
            setBooks(data.data.books);
        } catch {
            setBooks([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBooks(activeShelf);
    }, [activeShelf, fetchBooks]);

    const handleUpdateProgress = async (id, page) => {
        await updateProgress(id, page);
        fetchBooks(activeShelf);
    };

    const handleMoveShelf = async (id, shelf) => {
        await moveShelf(id, shelf);
        fetchBooks(activeShelf);
    };

    const handleRemove = async (id) => {
        await removeFromLibrary(id);
        fetchBooks(activeShelf);
    };

    return {
        books,
        loading,
        activeShelf,
        setActiveShelf,
        refreshBooks: () => fetchBooks(activeShelf),
        updateProgress: handleUpdateProgress,
        moveShelf: handleMoveShelf,
        removeBook: handleRemove,
    };
}
