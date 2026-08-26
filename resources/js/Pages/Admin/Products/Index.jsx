import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/Admin/StatusBadge';
import DeleteButton from '@/Components/Admin/DeleteButton';
import { EyeIcon, PencilIcon, TrashIcon } from '@/Components/Admin/ActionIcons';
import Pagination from '@/Components/Pagination';
import { firstImage } from '@/utils/media';

export default function AdminProductsIndex({ products, filters }) {
    function updateFilter(type) {
        router.get('/admin/produits', { type: type || undefined }, { preserveState: true });
    }

    return (
        <AdminLayout title="Produits">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <select value={filters?.type || ''} onChange={(e) => updateFilter(e.target.value)} className="input w-auto">
                    <option value="">Tous types</option>
                    <option value="produit">Produits</option>
                    <option value="commodity">Commodities</option>
                </select>
                <Link href="/admin/produits/create" className="rounded-full bg-keynis-red px-5 py-2.5 text-sm font-bold text-white hover:bg-keynis-red-dark">
                    + Nouveau produit
                </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-xs uppercase text-slate-400">
                            <tr>
                                <th className="px-5 py-3">Photo</th>
                                <th className="px-5 py-3">Nom</th>
                                <th className="px-5 py-3">Catégorie</th>
                                <th className="px-5 py-3">Type</th>
                                <th className="px-5 py-3">Statut</th>
                                <th className="px-5 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.data.map((p) => (
                                <tr key={p.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-3">
                                        {firstImage(p.images) ? (
                                            <img src={firstImage(p.images)} alt="" className="h-10 w-10 rounded-md object-cover" />
                                        ) : (
                                            <div className="h-10 w-10 rounded-md bg-keynis-gray" />
                                        )}
                                    </td>
                                    <td className="px-5 py-3">
                                        <Link href={`/admin/produits/${p.id}`} className="font-semibold text-keynis-navy hover:text-keynis-red">
                                            {p.name}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-3 text-slate-600">{p.category?.name || '—'}</td>
                                    <td className="px-5 py-3 text-slate-600 capitalize">{p.type}</td>
                                    <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-1">
                                            <Link href={`/admin/produits/${p.id}`} title="Voir plus" className="rounded-full p-2 text-keynis-navy hover:bg-keynis-gray">
                                                <EyeIcon className="h-4 w-4" />
                                            </Link>
                                            <Link href={`/admin/produits/${p.id}/edit`} title="Modifier" className="rounded-full p-2 text-keynis-navy hover:bg-keynis-gray">
                                                <PencilIcon className="h-4 w-4" />
                                            </Link>
                                            <DeleteButton
                                                url={`/admin/produits/${p.id}`}
                                                confirmMessage={`Supprimer "${p.name}" ?`}
                                                title="Supprimer"
                                                label={<TrashIcon className="h-4 w-4" />}
                                                className="rounded-full p-2 text-red-600 hover:bg-red-50"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.data.length === 0 && (
                                <tr><td colSpan={6} className="px-5 py-6 text-center text-slate-400">Aucun produit.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination links={products.links} />
        </AdminLayout>
    );
}
