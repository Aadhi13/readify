import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            {/* Content */}
            <div className="relative glass-card max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
                {title && (
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-surface-100">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-surface-400 hover:text-surface-200 transition-colors cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
