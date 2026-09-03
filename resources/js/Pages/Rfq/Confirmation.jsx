import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import ConfirmSubmissionButton from '@/Components/Site/ConfirmSubmissionButton';

const categoryLabels = {
    demande: 'Demande',
    offre: 'Offre',
    partenariat: 'Partenariat',
};

function Field({ label, value }) {
    if (!value) return null;
    return (
        <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</dt>
            <dd className="mt-0.5 text-sm text-keynis-navy">{value}</dd>
        </div>
    );
}

export default function RfqConfirmation({ submission }) {
    return (
        <SiteLayout
            title="Confirmation de votre demande"
            description="Récapitulatif de votre demande envoyée à Keynis Trading & Logistics Group."
        >
            <PageHero
                eyebrow="Confirmation"
                title="Votre demande a bien été envoyée"
                description="Notre équipe reviendra vers vous rapidement. Conservez cette fiche comme preuve de votre demande."
            />

            <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-wrap items-center justify-end gap-3 print:hidden">
                    <ConfirmSubmissionButton confirmUrl="/rfq/confirmation/confirm" confirmedAt={submission.confirmed_at} />
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
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">
                                {categoryLabels[submission.category] || submission.category}
                                {submission.type ? ` · ${submission.type.replace(/_/g, ' ')}` : ''}
                            </p>
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
                            <h3 className="mb-4 font-bold text-keynis-navy">Coordonnées</h3>
                            <dl className="space-y-3">
                                <Field label="Nom" value={submission.name} />
                                <Field label="Entreprise" value={submission.company} />
                                <Field label="Téléphone" value={submission.phone} />
                                <Field label="WhatsApp" value={submission.whatsapp} />
                                <Field label="E-mail" value={submission.email} />
                                <Field label="Pays" value={submission.country} />
                                <Field label="Ville" value={submission.city} />
                            </dl>
                        </div>

                        <div>
                            <h3 className="mb-4 font-bold text-keynis-navy">Détails de la demande</h3>
                            <dl className="space-y-3">
                                <Field label="Produit / commodity / service concerné" value={submission.subject} />
                                <Field label="Quantité" value={submission.quantity} />
                                <Field label="Budget éventuel" value={submission.budget} />
                                <Field label="Délai souhaité" value={submission.deadline} />
                                <Field label="Lieu de livraison" value={submission.delivery_location} />
                            </dl>
                        </div>
                    </div>

                    {submission.description && (
                        <div className="mt-6 border-t border-slate-100 pt-6">
                            <h3 className="mb-2 font-bold text-keynis-navy">Description / commentaire</h3>
                            <p className="whitespace-pre-line text-sm text-slate-600">{submission.description}</p>
                        </div>
                    )}
                </div>
            </section>
        </SiteLayout>
    );
}
