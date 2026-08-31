import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusSelect from '@/Components/Admin/StatusSelect';
import DeleteButton from '@/Components/Admin/DeleteButton';
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

function Row({ label, value }) {
    if (!value) return null;
    return (
        <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</dt>
            <dd className="mt-0.5 text-sm text-keynis-navy">{value}</dd>
        </div>
    );
}

export default function AdminPartnerShow({ partner }) {
    return (
        <AdminLayout title={partner.company_name}>
            <Link href="/admin/partenaires" className="text-sm font-semibold text-keynis-red hover:underline">← Tous les partenaires</Link>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-4">
                    {mediaUrl(partner.logo) ? (
                        <img src={mediaUrl(partner.logo)} alt={partner.company_name} className="h-14 w-14 rounded-lg border border-slate-200 object-contain p-1" />
                    ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-keynis-gray text-xs text-slate-400">Logo</div>
                    )}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">{categoryLabels[partner.category] || partner.category}</p>
                        <h2 className="mt-1 text-xl font-extrabold text-keynis-navy">{partner.company_name}</h2>
                        {partner.confirmed_at && (
                            <p className="mt-1 text-xs font-semibold text-green-700">
                                ✓ Confirmé par le client le {new Date(partner.confirmed_at).toLocaleString('fr-FR')}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusSelect status={partner.status} options={statusOptions} patchUrl={`/admin/partenaires/${partner.id}`} />
                    <Link href={`/admin/partenaires/${partner.id}/edit`} className="rounded-full bg-keynis-navy px-4 py-2 text-sm font-bold text-white hover:bg-keynis-navy-light">
                        Modifier
                    </Link>
                    <DeleteButton
                        url={`/admin/partenaires/${partner.id}`}
                        confirmMessage="Supprimer ce partenaire ? Cette action est irréversible."
                        className="rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50"
                    />
                </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="mb-4 font-bold text-keynis-navy">Contact</h3>
                    <dl className="space-y-3">
                        <Row label="Responsable" value={partner.contact_name} />
                        <Row label="Téléphone" value={partner.phone} />
                        <Row label="WhatsApp" value={partner.whatsapp} />
                        <Row label="E-mail" value={partner.email} />
                        <Row label="Site internet" value={partner.website} />
                        <Row label="Pays" value={partner.country} />
                        <Row label="Ville" value={partner.city} />
                    </dl>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="mb-4 font-bold text-keynis-navy">Activité</h3>
                    <dl className="space-y-3">
                        <Row label="Secteur" value={partner.sector} />
                        <Row label="Zone d'intervention" value={partner.coverage_area} />
                        <Row label="Produits / services" value={partner.products_services} />
                        <Row label="Capacités" value={partner.capacities} />
                    </dl>
                </div>

                {partner.message && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
                        <h3 className="mb-2 font-bold text-keynis-navy">Message</h3>
                        <p className="whitespace-pre-line text-sm text-slate-600">{partner.message}</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
