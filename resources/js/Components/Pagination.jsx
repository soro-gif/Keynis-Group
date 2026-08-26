import { router } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="mt-6 flex flex-wrap gap-2">
            {links.map((link, i) => (
                <button
                    key={i}
                    disabled={!link.url}
                    onClick={() => link.url && router.visit(link.url, { preserveState: true })}
                    className={`rounded-md px-3 py-1.5 text-sm ${link.active ? 'bg-keynis-navy text-white' : 'bg-keynis-gray text-slate-600'} disabled:opacity-40`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
