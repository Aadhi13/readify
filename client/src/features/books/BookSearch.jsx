import { useEffect, useState } from 'react';
import useBookSearch from './useBookSearch';
import useDebounce from '../../hooks/useDebounce';
import BookCard from './BookCard';
import { addBookToLibrary } from '../../api/library.api';
import PageWrapper from '../../components/layout/PageWrapper';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';

export default function BookSearch() {
    const { query, setQuery, books, loading, search } = useBookSearch();
    const debouncedQuery = useDebounce(query);
    const [addingId, setAddingId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (debouncedQuery) search(debouncedQuery);
    }, [debouncedQuery, search]);

    const handleAdd = async (book) => {
        setAddingId(book.googleBooksId);
        setMessage('');
        try {
            await addBookToLibrary({
                googleBooksId: book.googleBooksId,
                title: book.title,
                author: (book.authors || []).join(', '),
                cover: book.cover,
                totalPages: book.totalPages,
            });
            setMessage(`"${book.title}" added to your library! 📚`);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to add book');
        } finally {
            setAddingId(null);
        }
    };

    return (
        <PageWrapper title="🔍 Discover Books">
            <div className="max-w-2xl mb-8">
                <Input
                    placeholder="Search by title, author, or ISBN…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="text-lg"
                />
            </div>

            {message && (
                <div className="mb-6 p-3 rounded-lg bg-primary-600/10 border border-primary-500/30 text-primary-300 text-sm">
                    {message}
                </div>
            )}

            {loading ? (
                <Spinner className="mt-12" />
            ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                    {books.map((book) => (
                        <BookCard key={book.googleBooksId} book={book} onAdd={handleAdd} />
                    ))}
                </div>
            )}

            {!loading && query && books.length === 0 && (
                <p className="text-center text-surface-500 mt-12">No books found. Try a different search.</p>
            )}
        </PageWrapper>
    );
}
