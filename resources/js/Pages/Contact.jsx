import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import StepIndicator from '@/Components/Form/StepIndicator';
import StepNav from '@/Components/Form/StepNav';
import { isStepValid } from '@/utils/steps';
import { BrandFonts, BrandStyles, Breadcrumb, CurveMotif, ArrowOutIcon, InfoBlock, QuickCallBlock } from '@/Components/Site/Brand';
import { COLORS, FONT_TITLE, FONT_BODY } from '@/lib/brand';

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Angr%C3%A9+Les+Oscars%2C+Cocody%2C+Abidjan%2C+C%C3%B4te+d%27Ivoire';

const COORDINATES = [
    { key: 'fixe', icon: 'phone', label: 'Ligne fixe', value: '+225 27 22 58 40 16', note: 'Standard, jours ouvrés', href: 'tel:+2252722584016' },
    { key: 'mobile', icon: 'mobile', label: 'Mobile', value: '+225 07 15 25 89 88', note: 'Appels et WhatsApp', href: 'tel:+2250715258988' },
    { key: 'email', icon: 'mail', label: 'E-mail', value: 'info@keynisgroup.ci', note: 'Réponse sous 24 h ouvrées', href: 'mailto:info@keynisgroup.ci' },
    { key: 'bureaux', icon: 'location', label: 'Bureaux', value: 'Angré Les Oscars, Cocody', note: 'Abidjan, Côte d\'Ivoire', href: MAPS_URL, external: true },
];

const SUBJECT_OPTIONS = [
    { value: 'devis', label: 'Demande de devis' },
    { value: 'suivi', label: "Suivi d'une expédition" },
    { value: 'transit', label: 'Transit et formalités douanières' },
    { value: 'partenariat', label: 'Partenariat ou fournisseur' },
    { value: 'autre', label: 'Autre demande' },
];

const OPENING_HOURS = [
    { day: 'Lundi – Vendredi', time: '08h00 – 17h30' },
    { day: 'Samedi', time: '08h00 – 12h30' },
    { day: 'Dimanche', time: 'Fermé' },
];

const steps = [
    { title: 'Vos coordonnées', required: ['name', 'email'], fields: ['name', 'email', 'phone'] },
    { title: 'Votre demande', required: ['subject', 'message'], fields: ['subject', 'message'] },
];

export default function Contact() {
    return (
        <SiteLayout
            title="Contact"
            description="Contactez Keynis Trading & Logistics Group pour un devis, le suivi d'une expédition ou une formalité douanière. Réponse sous 24 h ouvrées."
        >
            <BrandFonts />
            <BrandStyles />

            <HeroBandeau />

            <section style={{ backgroundColor: COLORS.grisPortuaire }} className="py-14 sm:py-20">
                <div className="mx-auto grid max-w-[1180px] gap-10 px-4 sm:px-6 lg:grid-cols-[1.55fr_1fr] lg:px-8">
                    <ContactFormCard />
                    <InfoColumn />
                </div>
            </section>
        </SiteLayout>
    );
}

function HeroBandeau() {
    return (
        <div style={{ backgroundColor: COLORS.marineProfond }} className="relative overflow-hidden">
            <CurveMotif corner="top-left" />
            <CurveMotif corner="bottom-right" />

            <div className="relative z-10 mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Contact' }]} />

                <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-14">
                    <div>
                        <h1
                            style={{
                                fontFamily: FONT_TITLE,
                                fontSize: 'clamp(44px, 6.4vw, 76px)',
                                lineHeight: 0.98,
                                color: COLORS.blanc,
                            }}
                            className="font-semibold"
                        >
                            Parlons de votre prochaine expédition.
                        </h1>
                        <p
                            className="mt-6 max-w-md text-base sm:text-lg"
                            style={{ color: 'rgba(255,255,255,0.75)', fontFamily: FONT_BODY, lineHeight: 1.65 }}
                        >
                            Devis, suivi de marchandise, formalités douanières : dites-nous ce qu'il vous faut,
                            une équipe opérationnelle vous répond sous 24 h ouvrées.
                        </p>
                    </div>

                    <div
                        className="rounded-[2px] px-5 py-2 sm:px-6 sm:py-3"
                        style={{ border: `1px solid ${COLORS.filetSombre}`, backgroundColor: 'rgba(255,255,255,0.03)' }}
                    >
                        {COORDINATES.map((c, i) => (
                            <a
                                key={c.key}
                                href={c.href}
                                target={c.external ? '_blank' : undefined}
                                rel={c.external ? 'noopener noreferrer' : undefined}
                                className="kn-coord-row -mx-2 flex items-center gap-3 rounded-[2px] px-2 py-3.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#DA0910]"
                                style={{ borderBottom: i < COORDINATES.length - 1 ? `1px solid ${COLORS.filetSombre}` : 'none' }}
                            >
                                <span
                                    aria-hidden="true"
                                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[2px]"
                                    style={{ color: COLORS.blanc, backgroundColor: 'rgba(255,255,255,0.08)', borderLeft: `2px solid ${COLORS.rouge}` }}
                                >
                                    <ContactIcon name={c.icon} />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-[11px]" style={{ color: 'rgba(255,255,255,0.58)', fontFamily: FONT_BODY }}>
                                        {c.label}
                                    </span>
                                    <span
                                        className="mt-0.5 flex items-center gap-1.5 text-[19px] font-semibold leading-tight sm:text-[20px]"
                                        style={{ color: COLORS.blanc, fontFamily: FONT_TITLE }}
                                    >
                                        {c.value}
                                        {c.external && <ArrowOutIcon />}
                                    </span>
                                </span>
                                <span
                                    className="hidden max-w-[112px] shrink-0 text-right text-[11px] leading-snug sm:block"
                                    style={{ color: 'rgba(255,255,255,0.5)', fontFamily: FONT_BODY }}
                                >
                                    {c.note}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactFormCard() {
    const [step, setStep] = useState(0);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    useEffect(() => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length === 0) return;
        const idx = steps.findIndex((s) => s.fields.some((f) => errorKeys.includes(f)));
        if (idx !== -1) setStep(idx);
    }, [errors]);

    function submit(e) {
        e.preventDefault();
        if (step < steps.length - 1) {
            if (!isStepValid(data, steps[step].required)) return;
            setStep((s) => s + 1);
            return;
        }
        post('/contact', { preserveScroll: true });
    }

    return (
        <div className="rounded-2xl bg-white p-8">
            <form onSubmit={submit} className="space-y-4">
                <StepIndicator steps={steps.map((s) => s.title)} current={step} />

                {step === 0 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Nom et prénoms" required error={errors.name}>
                            <input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ex : Koffi Jean-Baptiste"
                                required
                                className="input"
                            />
                        </Field>
                        <Field label="E-mail" required error={errors.email}>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Ex : nom@societe.ci"
                                required
                                className="input"
                            />
                        </Field>
                        <Field label="Téléphone" error={errors.phone}>
                            <input
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Ex : 07 15 25 89 89"
                                className="input"
                            />
                        </Field>
                    </div>
                )}

                {step === 1 && (
                    <>
                        <Field label="Objet de la demande" required error={errors.subject}>
                            <select value={data.subject} onChange={(e) => setData('subject', e.target.value)} required className="input">
                                <option value="" disabled>
                                    Sélectionnez un objet
                                </option>
                                {SUBJECT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.label}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <Field label="Message" required error={errors.message}>
                            <textarea
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                placeholder="Nature de la marchandise, origine et destination, volume ou tonnage, échéance souhaitée…"
                                required
                                className="input"
                                rows={5}
                            />
                        </Field>
                    </>
                )}

                <StepNav
                    step={step}
                    isLast={step === steps.length - 1}
                    onBack={() => setStep((s) => s - 1)}
                    processing={processing}
                    submitLabel="Envoyer le message"
                    nextDisabled={!isStepValid(data, steps[step].required)}
                />
            </form>
        </div>
    );
}

function Field({ label, required, error, children }) {
    return (
        <label className="block">
            <span className="mb-1 block text-sm font-semibold text-keynis-navy">
                {label}
                {required && <span className="text-keynis-red"> *</span>}
            </span>
            {children}
            {error && <span className="mt-1 block text-xs text-keynis-red">{error}</span>}
        </label>
    );
}

function InfoColumn() {
    return (
        <div className="space-y-10">
            <InfoBlock title="Heures d'ouverture" icon={<ContactIcon name="clock" />}>
                <ul className="space-y-2.5">
                    {OPENING_HOURS.map((h) => (
                        <li key={h.day} className="flex items-baseline justify-between gap-4">
                            <span className="text-sm" style={{ color: COLORS.grisSecondaire, fontFamily: FONT_BODY }}>
                                {h.day}
                            </span>
                            <span className="text-base font-medium" style={{ color: COLORS.encre, fontFamily: FONT_TITLE }}>
                                {h.time}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="mt-4 text-xs" style={{ color: COLORS.grisSecondaire, fontFamily: FONT_BODY }}>
                    Heure d'Abidjan (GMT)
                </p>
            </InfoBlock>

            <InfoBlock title="Venir nous voir" icon={<ContactIcon name="location" />}>
                <p className="text-sm" style={{ color: COLORS.encre, fontFamily: FONT_BODY, lineHeight: 1.6 }}>
                    Angré Les Oscars
                    <br />
                    Cocody, Abidjan, Côte d'Ivoire
                </p>
                <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kn-maps-link mt-4 inline-flex items-center gap-1.5 pb-0.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#DA0910]"
                    style={{ color: COLORS.marine, borderBottom: `2px solid ${COLORS.rouge}`, fontFamily: FONT_BODY }}
                >
                    Ouvrir dans Google Maps
                    <ArrowOutIcon />
                </a>
            </InfoBlock>

            <InfoBlock title="Une expédition en cours ?" icon={<ContactIcon name="shipment" />}>
                <QuickCallBlock
                    lead="Pour un suivi immédiat, l'appel reste le canal le plus rapide."
                    phoneDisplay="+225 07 15 25 89 88"
                    phoneHref="tel:+2250715258988"
                />
            </InfoBlock>
        </div>
    );
}

function ContactIcon({ name }) {
    const common = {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
    };

    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" {...common}>
            {name === 'phone' && <path d="M7.4 3.5 9.6 8 7.8 9.7a15.1 15.1 0 0 0 6.5 6.5l1.7-1.8 4.5 2.2v2.6a1.8 1.8 0 0 1-2 1.8A17.4 17.4 0 0 1 3 5.5a1.8 1.8 0 0 1 1.8-2h2.6Z" />}
            {name === 'mobile' && <><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M10 5h4M11 18.5h2" /></>}
            {name === 'mail' && <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>}
            {name === 'location' && <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.4" /></>}
            {name === 'clock' && <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>}
            {name === 'shipment' && <><path d="M3 7h11v10H3zM14 10h3l4 4v3h-7z" /><circle cx="7" cy="18" r="1.5" /><circle cx="18" cy="18" r="1.5" /></>}
        </svg>
    );
}
