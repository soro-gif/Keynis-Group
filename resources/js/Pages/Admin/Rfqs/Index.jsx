import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusSelect from '@/Components/Admin/StatusSelect';
import DeleteButton from '@/Components/Admin/DeleteButton';
import { EyeIcon, PencilIcon, TrashIcon } from '@/Components/Admin/ActionIcons';
import Pagination from '@/Components/Pagination';

const statusOptions = [
    ['nouvelle', 'Nouvelle'],
    ['en_analyse', 'En analyse'],
    ['sourcing', 'Sourcing'],
    ['offre_disponible', 'Offre disponible'],
    ['negociation', 'Négociation'],
    ['validee', 'Validée'],
    ['livraison', 'Livraison'],
    ['cloturee', 'Clôturée'],
    ['annulee', 'Annulée'],
    ['rejetee', 'Rejetée'],
    ['en_attente', 'En attente'],
];

const categoryOptions = [
    ['demande', 'Demande'],
    ['offre', 'Offre'],
    ['partenariat', 'Partenariat'],
];

export default function AdminRfqsIndex({ rfqs, filters }) {
    function updateFilter(key, value) {
        router.get('/admin/rfqs', { ...filters, [key]: value || undefined }, { preserveState: true });
    }

    return (
        <AdminLayout title="Demandes (RFQ)">
            <div className="mb-4 flex flex-wrap gap-3">
                <select value={filters?.status || ''} onChange={(e) => updateFilter('status', e.target.value)} className="input w-auto">
                    <option value="">Tous les statuts</option>
                    {statusOptions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <select value={filters?.category || ''} onChange={(e) => updateFilter('category', e.target.value)} className="input w-auto">
                    <option value="">Toutes les catégories</option>
                    {categoryOptions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-xs uppercase text-slate-400">
                            <tr>
                                <th className="px-5 py-3">Référence</th>
                                <th className="px-5 py-3">Type</th>
                                <th className="px-5 py-3">Demandeur</th>
                                <th className="px-5 py-3">Objet</th>
                                <th className="px-5 py-3">Reçue le</th>
                                <th className="px-5 py-3">Statut</th>
                                <th className="px-5 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rfqs.data.map((rfq) => (
                                <tr key={rfq.id} className="cursor-pointer hover:bg-slate-50" onClick={() => router.visit(`/admin/rfqs/${rfq.id}`)}>
                                    <td className="px-5 py-3">
                                        <Link href={`/admin/rfqs/${rfq.id}`} className="font-semibold text-keynis-navy hover:text-keynis-red">
                                            {rfq.reference}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-3 text-slate-600">{rfq.type.replace(/_/g, ' ')}</td>
                                    <td className="px-5 py-3 text-slate-600">{rfq.name}</td>
                                    <td className="px-5 py-3 text-slate-600">{rfq.subject}</td>
                                    <td className="px-5 py-3 text-slate-500">{new Date(rfq.created_at).toLocaleDateString('fr-FR')}</td>
                                    <td className="px-5 py-3">
                                        <StatusSelect status={rfq.status} options={statusOptions} patchUrl={`/admin/rfqs/${rfq.id}`} />
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                            <Link href={`/admin/rfqs/${rfq.id}`} title="Voir plus" className="rounded-full p-2 text-keynis-navy hover:bg-keynis-gray">
                                                <EyeIcon className="h-4 w-4" />
                                            </Link>
                                            <Link href={`/admin/rfqs/${rfq.id}/edit`} title="Modifier" className="rounded-full p-2 text-keynis-navy hover:bg-keynis-gray">
                                                <PencilIcon className="h-4 w-4" />
                                            </Link>
                                            <DeleteButton
                                                url={`/admin/rfqs/${rfq.id}`}
                                                confirmMessage={`Supprimer la demande ${rfq.reference} ?`}
                                                title="Supprimer"
                                                label={<TrashIcon className="h-4 w-4" />}
                                                className="rounded-full p-2 text-red-600 hover:bg-red-50"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {rfqs.data.length === 0 && (
                                <tr><td colSpan={7} className="px-5 py-6 text-center text-slate-400">Aucune demande pour ces critères.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination links={rfqs.links} />
        </AdminLayout>
    );
}
