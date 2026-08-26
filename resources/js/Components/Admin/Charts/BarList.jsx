import { useState } from 'react';

const ACCENT = '#2a78d6';

export default function BarList({ title, subtitle, items, formatLabel, emptyMessage = 'Aucune donnée pour le moment.' }) {
    const [hovered, setHovered] = useState(null);
    const max = Math.max(...items.map((i) => i.count), 1);
    const hasData = items.some((i) => i.count > 0);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="font-bold text-keynis-navy">{title}</h3>
            {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}

            {!hasData ? (
                <p className="mt-6 text-sm text-slate-400">{emptyMessage}</p>
            ) : (
                <div className="mt-5 space-y-3">
                    {items.map((item, i) => {
                        const widthPct = (item.count / max) * 100;
                        const isHovered = hovered === i;
                        return (
                            <div
                                key={item.key ?? item.label}
                                className="group"
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <div className="mb-1 flex items-center justify-between text-xs">
                                    <span className="font-medium text-slate-600">{formatLabel ? formatLabel(item) : item.label}</span>
                                    <span className={`font-semibold tabular-nums ${isHovered ? 'text-keynis-navy' : 'text-slate-500'}`}>
                                        {item.count}
                                    </span>
                                </div>
                                <div className="h-2.5 w-full rounded-full bg-slate-100">
                                    <div
                                        className="h-2.5 rounded-full transition-all"
                                        style={{
                                            width: `${Math.max(widthPct, item.count > 0 ? 2 : 0)}%`,
                                            backgroundColor: ACCENT,
                                            opacity: isHovered ? 1 : 0.85,
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
