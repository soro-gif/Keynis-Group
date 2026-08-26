const SLOTS = ['#2a78d6', '#eb6834', '#1baf7a'];

export default function CategoryBreakdown({ title, items }) {
    const total = items.reduce((sum, i) => sum + i.count, 0);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="font-bold text-keynis-navy">{title}</h3>

            {total === 0 ? (
                <p className="mt-6 text-sm text-slate-400">Aucune donnée pour le moment.</p>
            ) : (
                <>
                    <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full bg-slate-100">
                        {items.map((item, i) => {
                            const pct = (item.count / total) * 100;
                            if (pct <= 0) return null;
                            return (
                                <div
                                    key={item.label}
                                    style={{ width: `${pct}%`, backgroundColor: SLOTS[i % SLOTS.length] }}
                                    className={i > 0 ? 'ml-0.5' : ''}
                                />
                            );
                        })}
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {items.map((item, i) => (
                            <div key={item.label}>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: SLOTS[i % SLOTS.length] }} />
                                    <span className="text-xs font-medium text-slate-600">{item.label}</span>
                                </div>
                                <p className="mt-0.5 text-lg font-bold text-keynis-navy">{item.count}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
