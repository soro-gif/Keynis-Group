import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DeleteButton from '@/Components/Admin/DeleteButton';
import { PencilIcon, TrashIcon } from '@/Components/Admin/ActionIcons';

export default function AdminProductCategoriesIndex({ categories }) {
    return (
        <AdminLayout title="Catégories produits">
            <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
                <Link href="/admin/categories-produits/create" className="rounded-full bg-keynis-red px-5 py-2.5 text-sm font-bold text-white hover:bg-keynis-red-dark">
                    + Nouvelle catégorie
                </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-xs uppercase text-slate-400">
                            <tr>
                                <th className="px-5 py-3">Nom</th>
                                <th className="px-5 py-3">Catégorie parente</th>
                                <th className="px-5 py-3">Secteur</th>
                                <th className="px-5 py-3">Produits</th>
                                <th className="px-5 py-3">Ordre</th>
                                <th className="px-5 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {categories.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-3 font-semibold text-keynis-navy">{c.name}</td>
                                    <td className="px-5 py-3 text-slate-600">{c.parent?.name || '—'}</td>
                                    <td className="px-5 py-3 text-slate-600">{c.sector || '—'}</td>
                                    <td className="px-5 py-3 text-slate-600">{c.products_count}</td>
                                    <td className="px-5 py-3 text-slate-600">{c.order}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-1">
                                            <Link href={`/admin/categories-produits/${c.id}/edit`} title="Modifier" className="rounded-full p-2 text-keynis-navy hover:bg-keynis-gray">
                                                <PencilIcon className="h-4 w-4" />
                                            </Link>
                                            <DeleteButton
                                                url={`/admin/categories-produits/${c.id}`}
                                                confirmMessage={`Supprimer "${c.name}" ? Les produits associés resteront mais sans catégorie.`}
                                                title="Supprimer"
                                                label={<TrashIcon className="h-4 w-4" />}
                                                className="rounded-full p-2 text-red-600 hover:bg-red-50"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr><td colSpan={6} className="px-5 py-6 text-center text-slate-400">Aucune catégorie.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
