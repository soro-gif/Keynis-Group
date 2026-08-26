import { router } from '@inertiajs/react';

export default function StatusSelect({ status, options, patchUrl }) {
    function handleChange(e) {
        router.patch(patchUrl, { status: e.target.value }, { preserveScroll: true, preserveState: true });
    }

    return (
        <select
            value={status}
            onChange={handleChange}
            onClick={(e) => e.stopPropagation()}
            className="rounded-md border-slate-300 py-1 text-xs font-semibold text-keynis-navy focus:border-keynis-navy focus:ring-keynis-navy"
        >
            {options.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
            ))}
        </select>
    );
}
