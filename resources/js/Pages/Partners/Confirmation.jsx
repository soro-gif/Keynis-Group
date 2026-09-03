import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import ConfirmSubmissionButton from '@/Components/Site/ConfirmSubmissionButton';
import { mediaUrl } from '@/utils/media';

const categoryOptions = [
    ['producteur', 'Producteur'],
    ['cooperative', 'Coopérative'],
    ['fabricant', 'Fabricant'],
    ['fournisseur', 'Fournisseur'],
    ['detenteur_stock', 'Détenteur de stock'],
    ['proprietaire_actif', "Propriétaire d'actif"],
    ['transporteur', 'Transporteur'],
    ['transitaire', 'Transitaire'],
    ['entrepositaire', 'Entrepositaire'],
    ['distributeur', 'Distributeur'],
];

function Field({ label, value }) {
    if (!value) return null;
    return (
        <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</dt>
            <dd className="mt-0.5 text-sm text-keynis-navy">{value}</dd>
        </div>
    );
}

export default function PartnerConfirmation({ submission }) {
    const categoryLabel = categoryOptions.find(([value]) => value === submission.category)?.[1] || submission.category;

    return (
        <SiteLayout
            title="Confirmation de votre candidature"
            description="Récapitulatif de votre candidature de partenariat avec Keynis Trading & Logistics Group."
        >
            <PageHero
                eyebrow="Confirmation"
                title="Votre candidature a bien été enregistrée"
                description="Notre équipe sourcing reviendra vers vous. Conservez cette fiche comme preuve de votre candidature."
            />

            <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-wrap items-center justify-end gap-3 print:hidden">
                    <ConfirmSubmissionButton confirmUrl="/partenaires/confirmation/confirm" confirmedAt={submission.confirmed_at} />
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
                    <div className="mb-6 hidden items-center gap-3 border-b border-slate-100 pb-6 print:flex">
                        <img src="/images/logo-keynis.png" alt="Keynis Trading & Logistics Group" className="h-14 w-auto" />
                        <div>
                            <p className="text-sm font-extrabold text-keynis-navy">Keynis Trading & Logistics Group</p>
                            <p className="text-xs text-slate-500">Abidjan, Côte d'Ivoire · contact@keynisgroup.ci · +225 07 15 25 89 88</p>
                        </div>
                    </div>

                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
                        <div className="flex items-center gap-4">
                            {mediaUrl(submission.logo) && (
                                <img
                                    src={mediaUrl(submission.logo)}
                                    alt={submission.company_name}
                                    className="h-12 w-12 shrink-0 rounded-lg border border-slate-200 object-contain p-1"
                                />
                            )}
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">{categoryLabel}</p>
                                <h2 className="mt-1 text-xl font-extrabold text-keynis-navy">{submission.reference}</h2>
                                {submission.confirmed_at && (
                                    <p className="mt-2 text-xs font-semibold text-green-700">
                                        ✓ Informations confirmées le {new Date(submission.confirmed_at).toLocaleString('fr-FR')}
                                    </p>
                                )}
                            </div>
                        </div>
                        {submission.submitted_at && (
                            <p className="text-sm text-slate-500">{new Date(submission.submitted_at).toLocaleString('fr-FR')}</p>
                        )}
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <h3 className="mb-4 font-bold text-keynis-navy">Entreprise</h3>
                            <dl className="space-y-3">
                                <Field label="Raison sociale" value={submission.company_name} />
                                <Field label="Secteur d'activité" value={submission.sector} />
                            </dl>
                        </div>

                        <div>
                            <h3 className="mb-4 font-bold text-keynis-navy">Contact</h3>
                            <dl className="space-y-3">
                                <Field label="Nom du responsable" value={submission.contact_name} />
                                <Field label="Pays" value={submission.country} />
                                <Field label="Ville" value={submission.city} />
                                <Field label="Téléphone" value={submission.phone} />
                                <Field label="WhatsApp" value={submission.whatsapp} />
                                <Field label="E-mail" value={submission.email} />
                                <Field label="Site internet" value={submission.website} />
                            </dl>
                        </div>
                    </div>

                    {(submission.products_services || submission.capacities || submission.coverage_area || submission.message) && (
                        <div className="mt-6 border-t border-slate-100 pt-6">
                            <h3 className="mb-4 font-bold text-keynis-navy">Activité</h3>
                            <dl className="space-y-3">
                                <Field label="Produits / services proposés" value={submission.products_services} />
                                <Field label="Capacités" value={submission.capacities} />
                                <Field label="Zone d'intervention" value={submission.coverage_area} />
                                <Field label="Message" value={submission.message} />
                            </dl>
                        </div>
                    )}
                </div>
            </section>
        </SiteLayout>
    );
}
