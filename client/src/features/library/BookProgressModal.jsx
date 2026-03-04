import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { SHELF_TYPES } from '../../utils/constants';
import { toPercent } from '../../utils/formatters';

export default function BookProgressModal({ book, isOpen, onClose, onUpdateProgress, onMoveShelf, onRemove }) {
    const [page, setPage] = useState(book?.currentPage || 0);

    if (!book) return null;

    const snap = book.bookSnapshot;
    const progress = toPercent(page, snap.totalPages);

    const handleSave = () => {
        onUpdateProgress(book._id, Number(page));
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={snap.title}>
            <div className="space-y-6">
                {/* Cover + info */}
                <div className="flex gap-4">
                    {snap.cover ? (
                        <img src={snap.cover} alt={snap.title} className="w-20 h-28 object-cover rounded-lg" />
                    ) : (
                        <div className="w-20 h-28 bg-surface-700 rounded-lg flex items-center justify-center text-2xl">📕</div>
                    )}
                    <div>
                        <p className="text-sm text-surface-400">{snap.author}</p>
                        <p className="text-xs text-surface-500 mt-1">{snap.totalPages} pages</p>
                    </div>
                </div>

                {/* Progress input */}
                <div>
                    <Input
                        label={`Current Page (${progress}%)`}
                        type="number"
                        min={0}
                        max={snap.totalPages || 9999}
                        value={page}
                        onChange={(e) => setPage(e.target.value)}
                    />
                    {snap.totalPages > 0 && (
                        <div className="mt-2 h-2 bg-surface-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                    <Button onClick={handleSave}>Save Progress</Button>
                    {Object.entries(SHELF_TYPES).map(([key, val]) =>
                        key !== book.shelf ? (
                            <Button
                                key={key}
                                variant="secondary"
                                size="sm"
                                onClick={() => {
                                    onMoveShelf(book._id, key);
                                    onClose();
                                }}
                            >
                                {val.emoji} {val.label}
                            </Button>
                        ) : null
                    )}
                </div>

                <Button
                    variant="danger"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                        onRemove(book._id);
                        onClose();
                    }}
                >
                    Remove from Library
                </Button>
            </div>
        </Modal>
    );
}
