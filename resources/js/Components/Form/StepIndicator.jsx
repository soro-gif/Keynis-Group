export default function StepIndicator({ steps, current }) {
    return (
        <div className="mb-8 flex items-center">
            {steps.map((label, i) => (
                <div key={label} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center">
                        <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                i < current
                                    ? 'bg-keynis-navy text-white'
                                    : i === current
                                    ? 'bg-keynis-red text-white'
                                    : 'bg-keynis-gray text-slate-400'
                            }`}
                        >
                            {i < current ? '✓' : i + 1}
                        </div>
                        <span className={`mt-1.5 hidden text-center text-xs font-semibold sm:block ${i <= current ? 'text-keynis-navy' : 'text-slate-400'}`}>
                            {label}
                        </span>
                    </div>
                    {i < steps.length - 1 && (
                        <div className={`mx-2 h-0.5 flex-1 ${i < current ? 'bg-keynis-navy' : 'bg-slate-200'}`} />
                    )}
                </div>
            ))}
        </div>
    );
}
