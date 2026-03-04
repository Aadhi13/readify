import useStats from './useStats';
import ReadingChart from './ReadingChart';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';

export default function StatsPage() {
    const { overview, history, loading } = useStats();

    if (loading) return <Spinner className="mt-20" />;

    const statCards = overview
        ? [
            { label: 'Total Books', value: overview.totalBooks, emoji: '📚' },
            { label: 'Currently Reading', value: overview.reading, emoji: '📖' },
            { label: 'Completed', value: overview.completed, emoji: '✅' },
            { label: 'Want to Read', value: overview.wantToRead, emoji: '📋' },
            { label: 'Pages Read', value: overview.totalPagesRead.toLocaleString(), emoji: '📄' },
            { label: 'Avg Rating', value: overview.averageRating ? `${overview.averageRating}/5` : '—', emoji: '⭐' },
        ]
        : [];

    return (
        <PageWrapper title="📊 Reading Stats">
            {/* Stat cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
                {statCards.map((stat) => (
                    <Card key={stat.label} className="text-center">
                        <div className="text-2xl mb-1">{stat.emoji}</div>
                        <div className="text-2xl font-bold text-surface-100">{stat.value}</div>
                        <div className="text-xs text-surface-400 mt-1">{stat.label}</div>
                    </Card>
                ))}
            </div>

            {/* Reading history chart */}
            <Card>
                <h2 className="text-lg font-semibold text-surface-100 mb-4">📈 Books Completed Over Time</h2>
                <ReadingChart history={history} />
            </Card>
        </PageWrapper>
    );
}
