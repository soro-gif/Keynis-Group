import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import ConfirmSubmissionButton from '@/Components/Site/ConfirmSubmissionButton';

function Field({ label, value }) {
    if (!value) return null;
    return (
        <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</dt>
            <dd className="mt-0.5 text-sm text-keynis-navy">{value}</dd>
        </div>
    );
}

function formatList(arr) {
    return Array.isArray(arr) && arr.length ? arr.join(', ') : null;
}

function hasAny(submission, keys) {
    return keys.some((key) => {
        const value = submission[key];
        return Array.isArray(value) ? value.length > 0 : Boolean(value);
    });
}

export default function AssetConfirmation({ submission }) {
    const showVehicle = hasAny(submission, [
        'vehicle_category', 'registration', 'color', 'mileage', 'condition',
        'transmission', 'engine', 'air_conditioning', 'equipment', 'availability',
        'intervention_zone', 'driver_available',
    ]);
    const showAvailability = hasAny(submission, [
        'available_days', 'schedule', 'service_zone', 'duration_type', 'with_driver',
        'price_per_day', 'price_per_mission',
    ]);
    const showDocuments = hasAny(submission, ['documents_provided']);

    return (
        <SiteLayout
            title="Confirmation de votre actif"
            description="Récapitulatif de votre actif soumis à Keynis Trading & Logistics Group."
        >
            <PageHero
                eyebrow="Confirmation"
                title="Votre actif a bien été soumis"
                description="Notre équipe le validera avant publication. Conservez cette fiche comme preuve de votre soumission."
            />

            <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-wrap items-center justify-end gap-3 print:hidden">
                    <ConfirmSubmissionButton confirmUrl="/actifs/confirmation/confirm" confirmedAt={submission.confirmed_at} />
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="rounded-full bg-keynis-navy px-5 py-2.5 text-sm font-bold text-white hover:bg-keynis-navy-light"
                    >
                        Imprimer cette fiche
                    </button>
                    <Link
                        href="/"
                        className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold text-keynis-navy hover:bg-slate-50"
                    >
                        Retour à l'accueil
                    </Link>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-8 print:border-none print:p-0">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">{submission.category_name}</p>
                            <h2 className="mt-1 text-xl font-extrabold text-keynis-navy">{submission.reference}</h2>
                            {submission.confirmed_at && (
                                <p className="mt-2 text-xs font-semibold text-green-700">
                                    ✓ Informations confirmées le {new Date(submission.confirmed_at).toLocaleString('fr-FR')}
                                </p>
                            )}
                        </div>
                        {submission.submitted_at && (
                            <p className="text-sm text-slate-500">{new Date(submission.submitted_at).toLocaleString('fr-FR')}</p>
                        )}
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <h3 className="mb-4 font-bold text-keynis-navy">Propriétaire</h3>
                            <dl className="space-y-3">
                                <Field label="Nom & Prénoms / Raison sociale" value={submission.owner_name} />
                                <Field label="Type de propriétaire" value={submission.owner_type} />
                                <Field label="Entreprise (si applicable)" value={submission.owner_company} />
                                <Field label="N° CNI / RCCM / CNPS / Autre" value={submission.id_number} />
                                <Field label="Téléphone" value={submission.owner_phone} />
                                <Field label="WhatsApp" value={submission.owner_whatsapp} />
                                <Field label="E-mail" value={submission.owner_email} />
                                <Field label="Adresse" value={submission.address} />
                                <Field label="Ville / Commune" value={submission.city} />
                                <Field label="Personne à contacter" value={submission.contact_person} />
                                <Field label="Fonction / Qualité" value={submission.contact_role} />
                            </dl>
                        </div>

                        <div>
                            <h3 className="mb-4 font-bold text-keynis-navy">Actif</h3>
                            <dl className="space-y-3">
                                <Field label="Catégorie" value={submission.category_name} />
                                <Field label="Nom de l'actif" value={submission.name} />
                                <Field label="Marque" value={submission.brand} />
                                <Field label="Modèle" value={submission.model} />
                                <Field label="Année" value={submission.year} />
                                <Field label="Capacité" value={submission.capacity} />
                                <Field label="Localisation" value={submission.location} />
                                <Field label="Prix indicatif" value={submission.indicative_price} />
                            </dl>
                        </div>

                        {showVehicle && (
                            <div>
                                <h3 className="mb-4 font-bold text-keynis-navy">Véhicule</h3>
                                <dl className="space-y-3">
                                    <Field label="Catégorie recherchée" value={submission.vehicle_category} />
                                    <Field label="Immatriculation" value={submission.registration} />
                                    <Field label="Couleur" value={submission.color} />
                                    <Field label="Kilométrage" value={submission.mileage} />
                                    <Field label="État général" value={submission.condition} />
                                    <Field label="Transmission" value={submission.transmission} />
                                    <Field label="Motorisation" value={submission.engine} />
                                    <Field label="Climatisation" value={submission.air_conditioning} />
                                    <Field label="GPS / Équipements" value={submission.equipment} />
                                    <Field label="Disponibilité" value={submission.availability} />
                                    <Field label="Zone d'intervention" value={submission.intervention_zone} />
                                    <Field label="Conducteur disponible ?" value={submission.driver_available} />
                                </dl>
                            </div>
                        )}

                        {showAvailability && (
                            <div>
                                <h3 className="mb-4 font-bold text-keynis-navy">Disponibilité</h3>
                                <dl className="space-y-3">
                                    <Field label="Jours disponibles" value={formatList(submission.available_days)} />
                                    <Field label="Horaires" value={formatList(submission.schedule)} />
                                    <Field label="Zone de service" value={formatList(submission.service_zone)} />
                                    <Field label="Durée de mise à disposition" value={formatList(submission.duration_type)} />
                                    <Field label="Avec chauffeur" value={submission.with_driver} />
                                    <Field label="Montant / jour (FCFA)" value={submission.price_per_day} />
                                    <Field label="Montant / mission (FCFA)" value={submission.price_per_mission} />
                                </dl>
                            </div>
                        )}

                        {showDocuments && (
                            <div>
                                <h3 className="mb-4 font-bold text-keynis-navy">Documents à fournir</h3>
                                <dl className="space-y-3">
                                    <Field label="Documents" value={formatList(submission.documents_provided)} />
                                </dl>
                            </div>
                        )}
                    </div>

                    {submission.description && (
                        <div className="mt-6 border-t border-slate-100 pt-6">
                            <h3 className="mb-2 font-bold text-keynis-navy">Description / observations</h3>
                            <p className="whitespace-pre-line text-sm text-slate-600">{submission.description}</p>
                        </div>
                    )}
                </div>
            </section>
        </SiteLayout>
    );
}
