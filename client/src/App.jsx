import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import BookSearch from './features/books/BookSearch';
import LibraryPage from './features/library/LibraryPage';
import StatsPage from './features/stats/StatsPage';
import { useAuthStore } from './store/authStore';

export default function App() {
  const { token } = useAuthStore();

  return (
    <BrowserRouter>
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/login" element={token ? <Navigate to="/library" /> : <LoginPage />} />
          <Route path="/register" element={token ? <Navigate to="/library" /> : <RegisterPage />} />

          {/* Protected */}
          <Route path="/search" element={<ProtectedRoute><BookSearch /></ProtectedRoute>} />
          <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
          <Route path="/stats" element={<ProtectedRoute><StatsPage /></ProtectedRoute>} />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to={token ? '/library' : '/login'} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
