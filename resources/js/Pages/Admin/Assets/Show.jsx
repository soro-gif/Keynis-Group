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

function ListRow({ label, value }) {
    if (!value || value.length === 0) return null;
    return <Row label={label} value={value.join(', ')} />;
}

export default function AdminAssetShow({ asset }) {
    return (
        <AdminLayout title={asset.name}>
            <Link href="/admin/actifs" className="text-sm font-semibold text-keynis-red hover:underline">← Tous les actifs</Link>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">{asset.category?.name || 'Sans catégorie'} · {asset.listing_type}</p>
                    <h2 className="mt-1 text-xl font-extrabold text-keynis-navy">{asset.name}</h2>
                    {asset.confirmed_at && (
                        <p className="mt-1 text-xs font-semibold text-green-700">
                            ✓ Confirmé par le client le {new Date(asset.confirmed_at).toLocaleString('fr-FR')}
                        </p>
                    )}
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
                        <Row label="Type de propriétaire" value={asset.owner_type} />
                        <Row label="Entreprise" value={asset.owner_company} />
                        <Row label="Téléphone" value={asset.owner_phone} />
                        <Row label="WhatsApp" value={asset.owner_whatsapp} />
                        <Row label="E-mail" value={asset.owner_email} />
                        <Row label="N° CNI / RCCM / CNPS" value={asset.id_number} />
                        <Row label="Adresse" value={asset.address} />
                        <Row label="Ville / Commune" value={asset.city} />
                        <Row label="Personne à contacter" value={asset.contact_person} />
                        <Row label="Fonction / Qualité" value={asset.contact_role} />
                    </dl>
                </div>

                {(asset.registration || asset.color || asset.transmission || asset.mileage) && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h3 className="mb-4 font-bold text-keynis-navy">Véhicule</h3>
                        <dl className="space-y-3">
                            <Row label="Catégorie recherchée" value={asset.vehicle_category} />
                            <Row label="Immatriculation" value={asset.registration} />
                            <Row label="Couleur" value={asset.color} />
                            <Row label="Kilométrage" value={asset.mileage} />
                            <Row label="État général" value={asset.condition} />
                            <Row label="Transmission" value={asset.transmission} />
                            <Row label="Motorisation" value={asset.engine} />
                            <Row label="Climatisation" value={asset.air_conditioning} />
                            <Row label="GPS / Équipements" value={asset.equipment} />
                            <Row label="Zone d'intervention" value={asset.intervention_zone} />
                            <Row label="Conducteur disponible ?" value={asset.driver_available} />
                        </dl>
                    </div>
                )}

                {(asset.available_days?.length || asset.schedule?.length || asset.service_zone?.length || asset.duration_type?.length || asset.with_driver || asset.price_per_day || asset.price_per_mission) && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h3 className="mb-4 font-bold text-keynis-navy">Disponibilité et conditions</h3>
                        <dl className="space-y-3">
                            <ListRow label="Jours disponibles" value={asset.available_days} />
                            <ListRow label="Horaires" value={asset.schedule} />
                            <ListRow label="Zone de service" value={asset.service_zone} />
                            <ListRow label="Durée de mise à disposition" value={asset.duration_type} />
                            <Row label="Avec chauffeur" value={asset.with_driver} />
                            <Row label="Montant / jour" value={asset.price_per_day && `${asset.price_per_day} FCFA`} />
                            <Row label="Montant / mission" value={asset.price_per_mission && `${asset.price_per_mission} FCFA`} />
                        </dl>
                    </div>
                )}

                {asset.documents_provided?.length > 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h3 className="mb-4 font-bold text-keynis-navy">Documents proposés</h3>
                        <ul className="space-y-1 text-sm text-slate-600">
                            {asset.documents_provided.map((doc) => (
                                <li key={doc}>• {doc}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {asset.description && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
                        <h3 className="mb-2 font-bold text-keynis-navy">Description</h3>
                        <p className="whitespace-pre-line text-sm text-slate-600">{asset.description}</p>
                    </div>
                )}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
                    <h3 className="mb-2 font-bold text-keynis-navy">Engagement</h3>
                    <p className="text-sm text-slate-600">
                        {asset.agreement
                            ? 'Le propriétaire a accepté les conditions de référencement et la politique de confidentialité.'
                            : "Le propriétaire n'a pas confirmé son acceptation des conditions de référencement."}
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
