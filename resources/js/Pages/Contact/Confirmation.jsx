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

export default function ContactConfirmation({ submission }) {
    return (
        <SiteLayout
            title="Confirmation de votre message"
            description="Récapitulatif de votre message envoyé à Keynis Trading & Logistics Group."
        >
            <PageHero
                eyebrow="Confirmation"
                title="Votre message a bien été envoyé"
                description="Nous vous répondrons dans les meilleurs délais. Conservez cette fiche comme preuve de votre envoi."
            />

            <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-wrap items-center justify-end gap-3 print:hidden">
                    <ConfirmSubmissionButton confirmUrl="/contact/confirmation/confirm" confirmedAt={submission.confirmed_at} />
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
                            <h2 className="text-xl font-extrabold text-keynis-navy">{submission.reference}</h2>
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

                    <dl className="space-y-3">
                        <Field label="Nom" value={submission.name} />
                        <Field label="E-mail" value={submission.email} />
                        <Field label="Téléphone" value={submission.phone} />
                        <Field label="Sujet" value={submission.subject} />
                    </dl>

                    {submission.message && (
                        <div className="mt-6 border-t border-slate-100 pt-6">
                            <h3 className="mb-2 font-bold text-keynis-navy">Message</h3>
                            <p className="whitespace-pre-line text-sm text-slate-600">{submission.message}</p>
                        </div>
                    )}
                </div>
            </section>
        </SiteLayout>
    );
}
