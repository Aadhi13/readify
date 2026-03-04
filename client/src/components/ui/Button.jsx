export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
}) {
    const base =
        'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500/50';

    const variants = {
        primary: 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/25',
        secondary: 'bg-surface-800 hover:bg-surface-700 text-surface-200 border border-surface-600',
        ghost: 'hover:bg-surface-800 text-surface-300',
        danger: 'bg-danger hover:bg-red-500 text-white',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
