import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';

export default function Navbar() {
    const { user, logout } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();

    const links = [
        { to: '/search', label: '🔍 Search' },
        { to: '/library', label: '📚 Library' },
        { to: '/stats', label: '📊 Stats' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass sticky top-0 z-40 border-b border-surface-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-gradient">
                        📖 Readify
                    </Link>

                    {/* Nav Links */}
                    {user && (
                        <div className="hidden sm:flex items-center gap-1">
                            {links.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === link.to
                                            ? 'bg-primary-600/20 text-primary-400'
                                            : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* User section */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <span className="text-sm text-surface-400 hidden sm:inline">
                                    {user.name}
                                </span>
                                <Button variant="ghost" size="sm" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Link to="/login">
                                <Button size="sm">Sign In</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile nav */}
            {user && (
                <div className="sm:hidden flex border-t border-surface-700/50">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex-1 py-3 text-center text-xs font-medium transition-all ${location.pathname === link.to
                                    ? 'text-primary-400 bg-primary-600/10'
                                    : 'text-surface-500'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
