import { useState } from 'react';

const ACCENT = '#2a78d6';
const WIDTH = 640;
const HEIGHT = 200;
const PAD_LEFT = 36;
const PAD_RIGHT = 12;
const PAD_TOP = 12;
const PAD_BOTTOM = 24;

function niceMax(value) {
    if (value <= 0) return 4;
    const pow = Math.pow(10, Math.floor(Math.log10(value)));
    const steps = [1, 2, 2.5, 5, 10];
    for (const step of steps) {
        const candidate = step * pow;
        if (candidate >= value) return candidate;
    }
    return value;
}

export default function TrendLine({ data, label = 'Demandes reçues', subtitle = '30 derniers jours' }) {
    const [hoverIndex, setHoverIndex] = useState(null);

    const max = niceMax(Math.max(...data.map((d) => d.count), 1));
    const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
    const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;

    const points = data.map((d, i) => {
        const x = PAD_LEFT + (i / (data.length - 1)) * plotWidth;
        const y = PAD_TOP + plotHeight - (d.count / max) * plotHeight;
        return { x, y, ...d };
    });

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
    const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(2)},${PAD_TOP + plotHeight} L${points[0].x.toFixed(2)},${PAD_TOP + plotHeight} Z`;

    const gridSteps = [0, 0.25, 0.5, 0.75, 1];
    const total = data.reduce((sum, d) => sum + d.count, 0);

    function handleMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const relX = ((e.clientX - rect.left) / rect.width) * WIDTH;
        const ratio = Math.min(1, Math.max(0, (relX - PAD_LEFT) / plotWidth));
        const index = Math.round(ratio * (data.length - 1));
        setHoverIndex(index);
    }

    const hovered = hoverIndex !== null ? points[hoverIndex] : null;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-baseline justify-between">
                <div>
                    <h3 className="font-bold text-keynis-navy">{label}</h3>
                    <p className="text-xs text-slate-400">{subtitle}</p>
                </div>
                <p className="text-2xl font-semibold text-keynis-navy">{total}</p>
            </div>

            <div className="relative mt-4">
                <svg
                    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                    className="w-full touch-none"
                    onMouseMove={handleMove}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    {gridSteps.map((step) => {
                        const y = PAD_TOP + plotHeight * (1 - step);
                        return (
                            <g key={step}>
                                <line x1={PAD_LEFT} x2={WIDTH - PAD_RIGHT} y1={y} y2={y} stroke="#e1e0d9" strokeWidth="1" />
                                <text x={PAD_LEFT - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#898781">
                                    {Math.round(max * step)}
                                </text>
                            </g>
                        );
                    })}

                    <path d={areaPath} fill={ACCENT} opacity="0.1" />
                    <path d={linePath} fill="none" stroke={ACCENT} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

                    {hovered && (
                        <>
                            <line x1={hovered.x} x2={hovered.x} y1={PAD_TOP} y2={PAD_TOP + plotHeight} stroke="#c3c2b7" strokeWidth="1" />
                            <circle cx={hovered.x} cy={hovered.y} r="4" fill={ACCENT} stroke="#fff" strokeWidth="2" />
                        </>
                    )}

                    {/* transparent hit layer for pointer tracking */}
                    <rect x={PAD_LEFT} y={0} width={plotWidth} height={HEIGHT} fill="transparent" />
                </svg>

                {hovered && (
                    <div
                        className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-lg border border-slate-100 bg-white px-3 py-1.5 text-xs shadow-lg"
                        style={{ left: `${(hovered.x / WIDTH) * 100}%` }}
                    >
                        <p className="font-semibold text-keynis-navy">{hovered.count} demande{hovered.count !== 1 ? 's' : ''}</p>
                        <p className="text-slate-400">{new Date(hovered.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
