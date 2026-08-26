import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusSelect from '@/Components/Admin/StatusSelect';
import DeleteButton from '@/Components/Admin/DeleteButton';
import Pagination from '@/Components/Pagination';

const statusOptions = [
    ['nouveau', 'Nouveau'],
    ['traite', 'Traité'],
];

export default function AdminContactsIndex({ contacts, filters }) {
    function updateFilter(status) {
        router.get('/admin/messages', { status: status || undefined }, { preserveState: true });
    }

    return (
        <AdminLayout title="Messages">
            <div className="mb-4 flex flex-wrap gap-3">
                <select value={filters?.status || ''} onChange={(e) => updateFilter(e.target.value)} className="input w-auto">
                    <option value="">Tous les statuts</option>
                    {statusOptions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
            </div>

            <div className="space-y-4">
                {contacts.data.map((c) => (
                    <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <p className="font-bold text-keynis-navy">{c.name} {c.subject && `· ${c.subject}`}</p>
                                <p className="text-sm text-slate-500">{c.email}{c.phone ? ` · ${c.phone}` : ''} · {new Date(c.created_at).toLocaleDateString('fr-FR')}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <StatusSelect status={c.status} options={statusOptions} patchUrl={`/admin/messages/${c.id}`} />
                                <DeleteButton url={`/admin/messages/${c.id}`} confirmMessage="Supprimer ce message ?" />
                            </div>
                        </div>
                        <p className="mt-3 whitespace-pre-line text-sm text-slate-600">{c.message}</p>
                    </div>
                ))}
                {contacts.data.length === 0 && (
                    <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-slate-400">
                        Aucun message pour ces critères.
                    </p>
                )}
            </div>

            <Pagination links={contacts.links} />
        </AdminLayout>
    );
}
