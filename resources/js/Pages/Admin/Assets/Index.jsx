import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusSelect from '@/Components/Admin/StatusSelect';
import DeleteButton from '@/Components/Admin/DeleteButton';
import { EyeIcon, PencilIcon, TrashIcon } from '@/Components/Admin/ActionIcons';
import Pagination from '@/Components/Pagination';
import { firstImage } from '@/utils/media';

const statusOptions = [
    ['en_attente', 'En attente'],
    ['publie', 'Publié'],
    ['indisponible', 'Indisponible'],
];

export default function AdminAssetsIndex({ assets, filters }) {
    function updateFilter(status) {
        router.get('/admin/actifs', { status: status || undefined }, { preserveState: true });
    }

    return (
        <AdminLayout title="Actifs">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <select value={filters?.status || ''} onChange={(e) => updateFilter(e.target.value)} className="input w-auto">
                    <option value="">Tous les statuts</option>
                    {statusOptions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <Link href="/admin/actifs/create" className="rounded-full bg-keynis-red px-5 py-2.5 text-sm font-bold text-white hover:bg-keynis-red-dark">
                    + Nouvel actif
                </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-xs uppercase text-slate-400">
                            <tr>
                                <th className="px-5 py-3">Photo</th>
                                <th className="px-5 py-3">Actif</th>
                                <th className="px-5 py-3">Catégorie</th>
                                <th className="px-5 py-3">Propriétaire</th>
                                <th className="px-5 py-3">Contact</th>
                                <th className="px-5 py-3">Localisation</th>
                                <th className="px-5 py-3">Statut</th>
                                <th className="px-5 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {assets.data.map((asset) => (
                                <tr key={asset.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-3">
                                        {firstImage(asset.photos) ? (
                                            <img src={firstImage(asset.photos)} alt="" className="h-10 w-10 rounded-md object-cover" />
                                        ) : (
                                            <div className="h-10 w-10 rounded-md bg-keynis-gray" />
                                        )}
                                    </td>
                                    <td className="px-5 py-3">
                                        <Link href={`/admin/actifs/${asset.id}`} className="font-semibold text-keynis-navy hover:text-keynis-red">
                                            {asset.name}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-3 text-slate-600">{asset.category?.name || '—'}</td>
                                    <td className="px-5 py-3 text-slate-600">{asset.owner_name}{asset.owner_company ? ` (${asset.owner_company})` : ''}</td>
                                    <td className="px-5 py-3 text-slate-600">{asset.owner_phone}</td>
                                    <td className="px-5 py-3 text-slate-600">{asset.location || '—'}</td>
                                    <td className="px-5 py-3">
                                        <StatusSelect status={asset.status} options={statusOptions} patchUrl={`/admin/actifs/${asset.id}`} />
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-1">
                                            <Link href={`/admin/actifs/${asset.id}`} title="Voir plus" className="rounded-full p-2 text-keynis-navy hover:bg-keynis-gray">
                                                <EyeIcon className="h-4 w-4" />
                                            </Link>
                                            <Link href={`/admin/actifs/${asset.id}/edit`} title="Modifier" className="rounded-full p-2 text-keynis-navy hover:bg-keynis-gray">
                                                <PencilIcon className="h-4 w-4" />
                                            </Link>
                                            <DeleteButton
                                                url={`/admin/actifs/${asset.id}`}
                                                confirmMessage={`Supprimer "${asset.name}" ?`}
                                                title="Supprimer"
                                                label={<TrashIcon className="h-4 w-4" />}
                                                className="rounded-full p-2 text-red-600 hover:bg-red-50"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {assets.data.length === 0 && (
                                <tr><td colSpan={8} className="px-5 py-6 text-center text-slate-400">Aucun actif pour ces critères.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination links={assets.links} />
        </AdminLayout>
    );
}
