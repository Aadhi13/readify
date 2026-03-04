export default function Card({ children, className = '', hover = false, ...props }) {
    return (
        <div
            className={`glass-card ${hover ? 'hover:border-primary-500/30 hover:glow transition-all duration-300' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
