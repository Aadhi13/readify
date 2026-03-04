import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../api/auth.api';
import { useAuthStore } from '../../store/authStore';

export default function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    const login = async (email, password) => {
        setLoading(true);
        setError('');
        try {
            const { data } = await loginUser({ email, password });
            setAuth(data.data.user, data.data.token);
            navigate('/library');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        setError('');
        try {
            const { data } = await registerUser({ name, email, password });
            setAuth(data.data.user, data.data.token);
            navigate('/library');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return { login, register, loading, error, setError };
}
