import { truncate } from '../../utils/formatters';
import Button from '../../components/ui/Button';

export default function BookCard({ book, onAdd, compact = false }) {
    return (
        <div className="glass-card flex gap-4 hover:border-primary-500/30 transition-all duration-300">
            {/* Cover */}
            <div className="flex-shrink-0">
                {book.cover ? (
                    <img
                        src={book.cover}
                        alt={book.title}
                        className="w-20 h-28 object-cover rounded-lg shadow-lg"
                    />
                ) : (
                    <div className="w-20 h-28 bg-surface-700 rounded-lg flex items-center justify-center text-2xl">
                        📕
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-surface-100 truncate">{book.title}</h3>
                <p className="text-sm text-surface-400 mb-1">
                    {(book.authors || [book.author]).join(', ')}
                </p>
                {!compact && book.description && (
                    <p className="text-xs text-surface-500 mb-2 line-clamp-2">
                        {truncate(book.description, 150)}
                    </p>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                    {book.totalPages > 0 && (
                        <span className="text-xs text-surface-500">{book.totalPages} pages</span>
                    )}
                    {book.averageRating && (
                        <span className="text-xs text-amber-400">⭐ {book.averageRating}</span>
                    )}
                </div>
                {onAdd && (
                    <Button size="sm" variant="secondary" className="mt-2" onClick={() => onAdd(book)}>
                        + Add to Library
                    </Button>
                )}
            </div>
        </div>
    );
}
