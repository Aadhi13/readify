import { toPercent } from '../../utils/formatters';
import { SHELF_TYPES } from '../../utils/constants';
import Badge from '../../components/ui/Badge';

export default function ShelfSection({ books, onUpdateProgress, onMoveShelf, onRemove, onSelectBook }) {
    if (books.length === 0) {
        return (
            <div className="text-center py-12 text-surface-500">
                <p className="text-4xl mb-2">📚</p>
                <p>No books here yet. Search and add some!</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => {
                const snap = book.bookSnapshot;
                const progress = toPercent(book.currentPage, snap.totalPages);
                const shelfInfo = SHELF_TYPES[book.shelf];

                return (
                    <div
                        key={book._id}
                        className="glass-card hover:border-primary-500/30 transition-all duration-300 cursor-pointer group"
                        onClick={() => onSelectBook?.(book)}
                    >
                        <div className="flex gap-4">
                            {snap.cover ? (
                                <img
                                    src={snap.cover}
                                    alt={snap.title}
                                    className="w-16 h-24 object-cover rounded-lg shadow-lg flex-shrink-0"
                                />
                            ) : (
                                <div className="w-16 h-24 bg-surface-700 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                                    📕
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-surface-100 truncate text-sm">{snap.title}</h3>
                                <p className="text-xs text-surface-400 mb-2">{snap.author}</p>
                                <Badge variant={book.shelf === 'completed' ? 'success' : book.shelf === 'reading' ? 'primary' : 'default'}>
                                    {shelfInfo?.emoji} {shelfInfo?.label}
                                </Badge>
                            </div>
                        </div>

                        {/* Progress bar */}
                        {snap.totalPages > 0 && (
                            <div className="mt-4">
                                <div className="flex justify-between text-xs text-surface-400 mb-1">
                                    <span>Page {book.currentPage} / {snap.totalPages}</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="h-1.5 bg-surface-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Star rating */}
                        {book.rating && (
                            <div className="mt-2 text-xs text-amber-400">
                                {'⭐'.repeat(Math.round(book.rating))} {book.rating}/5
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
