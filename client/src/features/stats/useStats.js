import { useState, useEffect } from 'react';
import { getOverview, getReadingHistory } from '../../api/stats.api';

export default function useStats() {
    const [overview, setOverview] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const [overviewRes, historyRes] = await Promise.all([
                    getOverview(),
                    getReadingHistory(),
                ]);
                setOverview(overviewRes.data.data);
                setHistory(historyRes.data.data.history);
            } catch {
                // silently fail
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return { overview, history, loading };
}
