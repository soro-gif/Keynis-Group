import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import ConfirmSubmissionButton from '@/Components/Site/ConfirmSubmissionButton';
import { BrandFonts, BrandStyles, Breadcrumb, CurveMotif, InfoBlock, QuickCallBlock } from '@/Components/Site/Brand';
import { COLORS, FONT_TITLE, FONT_BODY } from '@/lib/brand';

export default function ContactConfirmation({ submission }) {
    const rows = [
        { label: 'Nom', value: submission.name },
        { label: 'E-mail', value: submission.email },
        { label: 'Téléphone', value: submission.phone },
        { label: 'Sujet', value: submission.subject },
    ].filter((r) => r.value);

    return (
        <SiteLayout
            title="Confirmation de votre message"
            description="Récapitulatif de votre message envoyé à Keynis Trading & Logistics Group."
        >
            <BrandFonts />
            <BrandStyles />

            <HeroBandeau
                reference={submission.reference}
                submittedAt={submission.submitted_at}
                confirmed={!!submission.confirmed_at}
            />

            <section style={{ backgroundColor: COLORS.grisPortuaire }} className="py-14 sm:py-20 print:bg-white print:py-6">
                <div className="mx-auto grid max-w-[1180px] gap-10 px-4 sm:px-6 lg:grid-cols-[1.55fr_1fr] lg:px-8 print:block print:px-0">
                    <div
                        className="rounded-[2px] p-6 sm:p-8 print:border-0 print:p-0"
                        style={{ backgroundColor: COLORS.blanc, borderTop: `3px solid ${COLORS.marine}` }}
                    >
                        <div className="mb-6 flex flex-wrap items-center gap-3 print:hidden">
                            <ConfirmSubmissionButton confirmUrl="/contact/confirmation/confirm" confirmedAt={submission.confirmed_at} />
                            <button
                                type="button"
                                onClick={() => window.print()}
                                className="rounded-[2px] px-6 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#DA0910]"
                                style={{ border: `1px solid ${COLORS.marine}`, color: COLORS.marine, fontFamily: FONT_BODY }}
                            >
                                Imprimer cette fiche
                            </button>
                            <Link
                                href="/"
                                className="rounded-[2px] text-sm font-semibold transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#DA0910]"
                                style={{ color: COLORS.grisSecondaire, fontFamily: FONT_BODY }}
                            >
                                Retour à l'accueil
                            </Link>
                        </div>

                        <div className="mb-6 hidden items-center gap-3 pb-6 print:flex" style={{ borderBottom: `1px solid ${COLORS.filetClair}` }}>
                            <img src="/images/logo-keynis.png" alt="Keynis Trading & Logistics Group" className="h-14 w-auto" />
                            <div>
                                <p className="text-sm font-semibold" style={{ fontFamily: FONT_TITLE, color: COLORS.encre }}>
                                    Keynis Trading & Logistics Group
                                </p>
                                <p className="text-xs" style={{ color: COLORS.grisSecondaire, fontFamily: FONT_BODY }}>
                                    Abidjan, Côte d'Ivoire · contact@keynisgroup.ci · +225 07 15 25 89 88
                                </p>
                            </div>
                        </div>

                        <div className="hidden print:mb-6 print:block">
                            <h2 className="text-xl font-semibold" style={{ fontFamily: FONT_TITLE, color: COLORS.encre }}>
                                {submission.reference}
                            </h2>
                            {submission.submitted_at && (
                                <p className="text-sm" style={{ color: COLORS.grisSecondaire, fontFamily: FONT_BODY }}>
                                    {new Date(submission.submitted_at).toLocaleString('fr-FR')}
                                </p>
                            )}
                            {submission.confirmed_at && (
                                <p className="text-sm font-semibold" style={{ color: COLORS.rouge, fontFamily: FONT_BODY }}>
                                    Informations confirmées le {new Date(submission.confirmed_at).toLocaleString('fr-FR')}
                                </p>
                            )}
                        </div>

                        <div>
                            {rows.map((r, i) => (
                                <RecapRow key={r.label} label={r.label} value={r.value} isLast={i === rows.length - 1} />
                            ))}
                        </div>

                        {submission.message && (
                            <div className="mt-2 pt-6" style={{ borderTop: `1px solid ${COLORS.filetClair}` }}>
                                <h3 className="mb-2 text-sm font-semibold" style={{ color: COLORS.encre, fontFamily: FONT_TITLE }}>
                                    Message
                                </h3>
                                <p className="whitespace-pre-line text-sm" style={{ color: COLORS.encre, fontFamily: FONT_BODY, lineHeight: 1.65 }}>
                                    {submission.message}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-10 print:hidden">
                        <InfoBlock title="Une question sur votre message ?">
                            <QuickCallBlock
                                lead="Pour toute précision complémentaire, l'appel reste le canal le plus rapide."
                                phoneDisplay="+225 07 15 25 89 88"
                                phoneHref="tel:+2250715258988"
                            />
                        </InfoBlock>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}

function HeroBandeau({ reference, submittedAt, confirmed }) {
    return (
        <div style={{ backgroundColor: COLORS.marineProfond }} className="relative overflow-hidden print:hidden">
            <CurveMotif corner="top-left" />
            <CurveMotif corner="bottom-right" />

            <div className="relative z-10 mx-auto max-w-[1180px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                <Breadcrumb
                    items={[{ label: 'Accueil', href: '/' }, { label: 'Contact', href: '/contact' }, { label: 'Confirmation' }]}
                />

                <h1
                    style={{ fontFamily: FONT_TITLE, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1, color: COLORS.blanc }}
                    className="max-w-2xl font-semibold"
                >
                    Votre message a été envoyé.
                </h1>
                <p
                    className="mt-5 max-w-md text-base sm:text-lg"
                    style={{ color: 'rgba(255,255,255,0.75)', fontFamily: FONT_BODY, lineHeight: 1.65 }}
                >
                    Conservez la référence ci-dessous : elle identifie votre dossier auprès de notre équipe.
                </p>

                <div
                    className="mt-10 inline-flex flex-col gap-4 rounded-[2px] px-6 py-5 sm:flex-row sm:items-center"
                    style={{ border: `1px solid ${COLORS.filetSombre}`, backgroundColor: 'rgba(255,255,255,0.03)' }}
                >
                    <div className="flex items-start gap-3">
                        <span
                            aria-hidden="true"
                            className="mt-[9px] h-[7px] w-[7px] flex-shrink-0 rounded-full"
                            style={{ backgroundColor: COLORS.rouge }}
                        />
                        <span>
                            <span className="block text-xs" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: FONT_BODY }}>
                                Référence
                            </span>
                            <span className="mt-0.5 block text-[25px] font-medium" style={{ color: COLORS.blanc, fontFamily: FONT_TITLE }}>
                                {reference}
                            </span>
                        </span>
                    </div>

                    {submittedAt && (
                        <span
                            className="text-xs sm:border-l sm:pl-6"
                            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: FONT_BODY, borderColor: COLORS.filetSombre }}
                        >
                            Reçu le {new Date(submittedAt).toLocaleString('fr-FR')}
                        </span>
                    )}

                    {confirmed && (
                        <span
                            className="text-xs font-semibold sm:border-l sm:pl-6"
                            style={{ color: COLORS.rouge, fontFamily: FONT_BODY, borderColor: COLORS.filetSombre }}
                        >
                            Informations confirmées
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

function RecapRow({ label, value, isLast }) {
    return (
        <div
            className="flex flex-col gap-1 py-4 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            style={{ borderBottom: isLast ? 'none' : `1px solid ${COLORS.filetClair}` }}
        >
            <span className="text-xs" style={{ color: COLORS.grisSecondaire, fontFamily: FONT_BODY }}>
                {label}
            </span>
            <span className="text-lg font-medium sm:text-right" style={{ color: COLORS.encre, fontFamily: FONT_TITLE }}>
                {value}
            </span>
        </div>
    );
}
