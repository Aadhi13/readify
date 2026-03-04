import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-surface-300">{label}</label>
            )}
            <input
                ref={ref}
                className={`w-full px-4 py-2.5 bg-surface-800/80 border border-surface-600 rounded-xl text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 ${error ? 'border-danger' : ''} ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-danger">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;
