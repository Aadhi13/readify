export default function PageWrapper({ title, children, className = '' }) {
    return (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
            {title && (
                <h1 className="text-2xl sm:text-3xl font-bold text-surface-100 mb-8">
                    {title}
                </h1>
            )}
            {children}
        </div>
    );
}
