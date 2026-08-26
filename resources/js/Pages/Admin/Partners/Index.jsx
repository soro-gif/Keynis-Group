import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusSelect from '@/Components/Admin/StatusSelect';
import DeleteButton from '@/Components/Admin/DeleteButton';
import { EyeIcon, PencilIcon, TrashIcon } from '@/Components/Admin/ActionIcons';
import Pagination from '@/Components/Pagination';
import { mediaUrl } from '@/utils/media';

const statusOptions = [
    ['nouveau', 'Nouveau'],
    ['en_qualification', 'En qualification'],
    ['valide', 'Validé'],
    ['rejete', 'Rejeté'],
];

const categoryLabels = {
    producteur: 'Producteur',
    cooperative: 'Coopérative',
    fabricant: 'Fabricant',
    fournisseur: 'Fournisseur',
    detenteur_stock: 'Détenteur de stock',
    proprietaire_actif: "Propriétaire d'actif",
    transporteur: 'Transporteur',
    transitaire: 'Transitaire',
    entrepositaire: 'Entrepositaire',
    distributeur: 'Distributeur',
};

export default function AdminPartnersIndex({ partners, filters }) {
    function updateFilter(status) {
        router.get('/admin/partenaires', { status: status || undefined }, { preserveState: true });
    }

    return (
        <AdminLayout title="Partenaires">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <select value={filters?.status || ''} onChange={(e) => updateFilter(e.target.value)} className="input w-auto">
                    <option value="">Tous les statuts</option>
                    {statusOptions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <Link href="/admin/partenaires/create" className="rounded-full bg-keynis-red px-5 py-2.5 text-sm font-bold text-white hover:bg-keynis-red-dark">
                    + Nouveau partenaire
                </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-xs uppercase text-slate-400">
                            <tr>
                                <th className="px-5 py-3">Logo</th>
                                <th className="px-5 py-3">Entreprise</th>
                                <th className="px-5 py-3">Catégorie</th>
                                <th className="px-5 py-3">Contact</th>
                                <th className="px-5 py-3">Pays / Ville</th>
                                <th className="px-5 py-3">Statut</th>
                                <th className="px-5 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {partners.data.map((p) => (
                                <tr key={p.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-3">
                                        {mediaUrl(p.logo) ? (
                                            <img src={mediaUrl(p.logo)} alt="" className="h-10 w-10 rounded-md border border-slate-200 object-contain p-0.5" />
                                        ) : (
                                            <div className="h-10 w-10 rounded-md bg-keynis-gray" />
                                        )}
                                    </td>
                                    <td className="px-5 py-3">
                                        <Link href={`/admin/partenaires/${p.id}`} className="font-semibold text-keynis-navy hover:text-keynis-red">
                                            {p.company_name}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-3 text-slate-600">{categoryLabels[p.category] || p.category}</td>
                                    <td className="px-5 py-3 text-slate-600">{p.contact_name} · {p.phone}</td>
                                    <td className="px-5 py-3 text-slate-600">{[p.city, p.country].filter(Boolean).join(', ')}</td>
                                    <td className="px-5 py-3">
                                        <StatusSelect status={p.status} options={statusOptions} patchUrl={`/admin/partenaires/${p.id}`} />
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-1">
                                            <Link href={`/admin/partenaires/${p.id}`} title="Voir plus" className="rounded-full p-2 text-keynis-navy hover:bg-keynis-gray">
                                                <EyeIcon className="h-4 w-4" />
                                            </Link>
                                            <Link href={`/admin/partenaires/${p.id}/edit`} title="Modifier" className="rounded-full p-2 text-keynis-navy hover:bg-keynis-gray">
                                                <PencilIcon className="h-4 w-4" />
                                            </Link>
                                            <DeleteButton
                                                url={`/admin/partenaires/${p.id}`}
                                                confirmMessage={`Supprimer "${p.company_name}" ?`}
                                                title="Supprimer"
                                                label={<TrashIcon className="h-4 w-4" />}
                                                className="rounded-full p-2 text-red-600 hover:bg-red-50"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {partners.data.length === 0 && (
                                <tr><td colSpan={7} className="px-5 py-6 text-center text-slate-400">Aucun partenaire pour ces critères.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination links={partners.links} />
        </AdminLayout>
    );
}
