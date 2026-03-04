import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { monthName } from '../../utils/formatters';

export default function ReadingChart({ history }) {
    if (!history || history.length === 0) {
        return (
            <div className="text-center py-8 text-surface-500">
                <p>No reading history yet. Complete some books to see your chart!</p>
            </div>
        );
    }

    const data = history.map((h) => ({
        label: `${monthName(h.month)} ${h.year}`,
        books: h.booksCompleted,
        pages: h.pagesRead,
    }));

    return (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '12px',
                            color: '#f1f5f9',
                        }}
                    />
                    <Bar dataKey="books" fill="#6366f1" radius={[6, 6, 0, 0]} name="Books Completed" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
