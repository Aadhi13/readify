import { useState } from 'react';
import useLibrary from './useLibrary';
import ShelfSection from './ShelfSection';
import BookProgressModal from './BookProgressModal';
import PageWrapper from '../../components/layout/PageWrapper';
import Spinner from '../../components/ui/Spinner';
import { SHELF_TYPES } from '../../utils/constants';

export default function LibraryPage() {
    const {
        books,
        loading,
        activeShelf,
        setActiveShelf,
        updateProgress,
        moveShelf,
        removeBook,
    } = useLibrary();

    const [selectedBook, setSelectedBook] = useState(null);

    const shelves = [
        { key: null, label: 'All Books', emoji: '📚' },
        ...Object.entries(SHELF_TYPES).map(([key, val]) => ({ key, ...val })),
    ];

    return (
        <PageWrapper title="📚 My Library">
            {/* Shelf tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {shelves.map((shelf) => (
                    <button
                        key={shelf.key ?? 'all'}
                        onClick={() => setActiveShelf(shelf.key)}
                        className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${activeShelf === shelf.key
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                                : 'bg-surface-800 text-surface-400 hover:bg-surface-700'
                            }`}
                    >
                        {shelf.emoji} {shelf.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <Spinner className="mt-12" />
            ) : (
                <ShelfSection
                    books={books}
                    onUpdateProgress={updateProgress}
                    onMoveShelf={moveShelf}
                    onRemove={removeBook}
                    onSelectBook={setSelectedBook}
                />
            )}

            {/* Progress modal */}
            <BookProgressModal
                book={selectedBook}
                isOpen={!!selectedBook}
                onClose={() => setSelectedBook(null)}
                onUpdateProgress={updateProgress}
                onMoveShelf={moveShelf}
                onRemove={removeBook}
            />
        </PageWrapper>
    );
}
