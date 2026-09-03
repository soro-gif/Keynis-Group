import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import { firstImage } from '@/utils/media';

export default function AssetShow({ asset, related }) {
    const specs = [
        ['Marque', asset.brand],
        ['Modèle', asset.model],
        ['Année', asset.year],
        ['Immatriculation', asset.registration],
        ['Couleur', asset.color],
        ['Capacité / places', asset.capacity],
        ['Kilométrage', asset.mileage],
        ['État général', asset.condition],
        ['Transmission', asset.transmission],
        ['Motorisation', asset.engine],
        ['Climatisation', asset.air_conditioning],
        ['GPS / Équipements', asset.equipment],
        ['Localisation', asset.location],
        ['Disponibilité', asset.availability],
        ["Zone d'intervention", asset.intervention_zone],
        ['Conducteur disponible', asset.driver_available],
    ].filter(([, value]) => Boolean(value));

    const conditions = [
        ['Jours disponibles', asset.available_days],
        ['Horaires', asset.schedule],
        ['Zone de service', asset.service_zone],
        ['Durée de mise à disposition', asset.duration_type],
    ].filter(([, value]) => Array.isArray(value) && value.length > 0);

    return (
        <SiteLayout
            title={asset.name}
            description={asset.description || `${asset.name} — actif proposé à la location via Keynis Trading & Logistics Group.`}
        >
            <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <nav className="mb-6 text-sm text-slate-500">
                    <Link href="/actifs" className="hover:text-keynis-navy">Location & Actifs</Link>
                    {asset.category && (
                        <>
                            {' / '}
                            <Link href={`/actifs?family=${asset.category.family}`} className="hover:text-keynis-navy">
                                {asset.category.name}
                            </Link>
                        </>
                    )}
                </nav>

                <h1 className="text-3xl font-extrabold text-keynis-navy">{asset.name}</h1>
                {(asset.brand || asset.model) && (
                    <p className="mt-1 text-sm text-slate-500">{[asset.brand, asset.model].filter(Boolean).join(' ')}</p>
                )}

                {firstImage(asset.photos) && (
                    <img
                        src={firstImage(asset.photos)}
                        alt={asset.name}
                        className="mt-6 h-72 w-full max-w-2xl rounded-2xl object-cover"
                    />
                )}

                <div className="mt-8 grid gap-10 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {asset.description && (
                            <p className="text-slate-600">{asset.description}</p>
                        )}

                        {specs.length > 0 && (
                            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
                                {specs.map(([label, value]) => (
                                    <div key={label} className="contents">
                                        <dt className="font-semibold text-keynis-navy">{label}</dt>
                                        <dd className="text-slate-600">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        )}

                        {conditions.length > 0 && (
                            <div className="mt-10">
                                <h2 className="text-sm font-bold uppercase tracking-wide text-keynis-navy">Conditions de partenariat</h2>
                                <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                    {conditions.map(([label, value]) => (
                                        <div key={label} className="contents">
                                            <dt className="font-semibold text-keynis-navy">{label}</dt>
                                            <dd className="text-slate-600">{value.join(', ')}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}
                    </div>

                    <div className="rounded-2xl bg-keynis-gray p-6">
                        <p className="text-sm font-bold uppercase tracking-wide text-keynis-navy">Tarif</p>
                        <p className="mt-1 text-2xl font-extrabold text-keynis-navy">
                            {asset.price_per_day
                                ? `${asset.price_per_day} FCFA / jour`
                                : asset.price_per_mission
                                ? `${asset.price_per_mission} FCFA / mission`
                                : asset.indicative_price || 'Sur demande'}
                        </p>
                        {asset.with_driver && (
                            <p className="mt-2 text-sm text-slate-600">Avec chauffeur : {asset.with_driver}</p>
                        )}
                        <Link
                            href={`/actifs/${asset.id}/demande`}
                            className="mt-6 block rounded-full bg-keynis-red px-6 py-3 text-center text-sm font-bold text-white hover:bg-keynis-red-dark"
                        >
                            Demander cet actif
                        </Link>
                    </div>
                </div>

                {related?.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-xl font-bold text-keynis-navy">Actifs similaires</h2>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {related.map((r) => (
                                <Link key={r.id} href={`/actifs/${r.id}`} className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-keynis-navy hover:border-keynis-red">
                                    {r.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </SiteLayout>
    );
}
