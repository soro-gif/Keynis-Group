import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/Admin/StatusBadge';
import DeleteButton from '@/Components/Admin/DeleteButton';
import { firstImage } from '@/utils/media';

function Row({ label, value }) {
    if (!value) return null;
    return (
        <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</dt>
            <dd className="mt-0.5 text-sm text-keynis-navy">{value}</dd>
        </div>
    );
}

export default function AdminProductShow({ product }) {
    return (
        <AdminLayout title={product.name}>
            <Link href="/admin/produits" className="text-sm font-semibold text-keynis-red hover:underline">← Tous les produits</Link>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">{product.category?.name || 'Sans catégorie'} · {product.type}</p>
                    <h2 className="mt-1 text-xl font-extrabold text-keynis-navy">{product.name}</h2>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status={product.status} />
                    <Link href={`/admin/produits/${product.id}/edit`} className="rounded-full bg-keynis-navy px-4 py-2 text-sm font-bold text-white hover:bg-keynis-navy-light">
                        Modifier
                    </Link>
                    <Link href={`/produits/${product.slug}`} target="_blank" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-keynis-navy hover:bg-keynis-gray">
                        Voir sur le site
                    </Link>
                    <DeleteButton
                        url={`/admin/produits/${product.id}`}
                        confirmMessage="Supprimer ce produit ? Cette action est irréversible."
                        className="rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50"
                    />
                </div>
            </div>

            {firstImage(product.images) && (
                <img
                    src={firstImage(product.images)}
                    alt={product.name}
                    className="mt-6 h-56 w-full max-w-md rounded-2xl border border-slate-200 object-cover"
                />
            )}

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="mb-4 font-bold text-keynis-navy">Informations</h3>
                    <dl className="space-y-3">
                        <Row label="Référence" value={product.reference} />
                        <Row label="Marque" value={product.brand} />
                        <Row label="Origine" value={product.origin} />
                        <Row label="Conditionnement" value={product.conditioning} />
                        <Row label="Quantité minimale" value={product.min_quantity} />
                        <Row label="Quantité disponible" value={product.quantity_available} />
                        <Row label="Localisation" value={product.location} />
                    </dl>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="mb-4 font-bold text-keynis-navy">Prix</h3>
                    <dl className="space-y-3">
                        <Row label="Mode de prix" value={product.price_mode} />
                        <Row label="Prix" value={product.price ? `${product.price} FCFA` : null} />
                        <Row label="Mis en avant" value={product.is_featured ? 'Oui' : 'Non'} />
                    </dl>
                </div>

                {product.description && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
                        <h3 className="mb-2 font-bold text-keynis-navy">Description</h3>
                        <p className="whitespace-pre-line text-sm text-slate-600">{product.description}</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
