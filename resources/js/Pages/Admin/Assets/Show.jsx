import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusSelect from '@/Components/Admin/StatusSelect';
import DeleteButton from '@/Components/Admin/DeleteButton';
import { firstImage } from '@/utils/media';

const statusOptions = [
    ['en_attente', 'En attente'],
    ['publie', 'Publié'],
    ['indisponible', 'Indisponible'],
];

function Row({ label, value }) {
    if (!value) return null;
    return (
        <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</dt>
            <dd className="mt-0.5 text-sm text-keynis-navy">{value}</dd>
        </div>
    );
}

export default function AdminAssetShow({ asset }) {
    return (
        <AdminLayout title={asset.name}>
            <Link href="/admin/actifs" className="text-sm font-semibold text-keynis-red hover:underline">← Tous les actifs</Link>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">{asset.category?.name || 'Sans catégorie'} · {asset.listing_type}</p>
                    <h2 className="mt-1 text-xl font-extrabold text-keynis-navy">{asset.name}</h2>
                </div>
                <div className="flex items-center gap-3">
                    <StatusSelect status={asset.status} options={statusOptions} patchUrl={`/admin/actifs/${asset.id}`} />
                    <Link href={`/admin/actifs/${asset.id}/edit`} className="rounded-full bg-keynis-navy px-4 py-2 text-sm font-bold text-white hover:bg-keynis-navy-light">
                        Modifier
                    </Link>
                    <DeleteButton
                        url={`/admin/actifs/${asset.id}`}
                        confirmMessage="Supprimer cet actif ? Cette action est irréversible."
                        className="rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50"
                    />
                </div>
            </div>

            {firstImage(asset.photos) && (
                <img
                    src={firstImage(asset.photos)}
                    alt={asset.name}
                    className="mt-6 h-56 w-full max-w-md rounded-2xl border border-slate-200 object-cover"
                />
            )}

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="mb-4 font-bold text-keynis-navy">Actif</h3>
                    <dl className="space-y-3">
                        <Row label="Marque" value={asset.brand} />
                        <Row label="Modèle" value={asset.model} />
                        <Row label="Année" value={asset.year} />
                        <Row label="Capacité" value={asset.capacity} />
                        <Row label="Localisation" value={asset.location} />
                        <Row label="Disponibilité" value={asset.availability} />
                        <Row label="Prix indicatif" value={asset.indicative_price} />
                    </dl>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="mb-4 font-bold text-keynis-navy">Propriétaire</h3>
                    <dl className="space-y-3">
                        <Row label="Nom" value={asset.owner_name} />
                        <Row label="Entreprise" value={asset.owner_company} />
                        <Row label="Téléphone" value={asset.owner_phone} />
                        <Row label="WhatsApp" value={asset.owner_whatsapp} />
                        <Row label="E-mail" value={asset.owner_email} />
                    </dl>
                </div>

                {asset.description && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
                        <h3 className="mb-2 font-bold text-keynis-navy">Description</h3>
                        <p className="whitespace-pre-line text-sm text-slate-600">{asset.description}</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
