export default function Badge({ children, variant = 'default', className = '' }) {
    const variants = {
        default: 'bg-surface-700 text-surface-300',
        primary: 'bg-primary-600/20 text-primary-400 border border-primary-500/30',
        success: 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30',
        warning: 'bg-amber-600/20 text-amber-400 border border-amber-500/30',
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
        >
            {children}
        </span>
    );
}
