import { useRef, useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import { BrandFonts, BrandStyles, Breadcrumb, CurveMotif, ArrowOutIcon, InfoBlock, QuickCallBlock } from '@/Components/Site/Brand';
import { COLORS, FONT_TITLE, FONT_BODY } from '@/lib/brand';

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Angr%C3%A9+Les+Oscars%2C+Cocody%2C+Abidjan%2C+C%C3%B4te+d%27Ivoire';

const COORDINATES = [
    { key: 'fixe', label: 'Ligne fixe', value: '+225 27 22 58 40 16', note: 'Standard, jours ouvrés', href: 'tel:+2252722584016' },
    { key: 'mobile', label: 'Mobile', value: '+225 07 15 25 89 88', note: 'Appels et WhatsApp', href: 'tel:+2250715258988' },
    { key: 'email', label: 'E-mail', value: 'info@keynisgroup.ci', note: 'Réponse sous 24 h ouvrées', href: 'mailto:info@keynisgroup.ci' },
    { key: 'bureaux', label: 'Bureaux', value: 'Angré Les Oscars, Cocody', note: 'Abidjan, Côte d\'Ivoire', href: MAPS_URL, external: true },
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

const INITIAL_FORM = {
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    reference: '',
    message: '',
};

const inputStyle = (hasError) => ({
    borderColor: hasError ? COLORS.rouge : COLORS.filetClair,
    backgroundColor: COLORS.blanc,
    color: COLORS.encre,
    fontFamily: FONT_BODY,
});

const inputClass =
    'w-full rounded-[2px] border px-3.5 py-2.5 text-sm transition focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#DA0910]';

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

            <div className="relative z-10 mx-auto max-w-[1180px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Contact' }]} />

                <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
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
                        className="rounded-[2px] p-6 sm:p-7"
                        style={{ border: `1px solid ${COLORS.filetSombre}`, backgroundColor: 'rgba(255,255,255,0.03)' }}
                    >
                        {COORDINATES.map((c, i) => (
                            <a
                                key={c.key}
                                href={c.href}
                                target={c.external ? '_blank' : undefined}
                                rel={c.external ? 'noopener noreferrer' : undefined}
                                className="kn-coord-row -mx-2 flex items-start gap-3 rounded-[2px] px-2 py-4 transition first:pt-0 last:pb-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#DA0910]"
                                style={{ borderBottom: i < COORDINATES.length - 1 ? `1px solid ${COLORS.filetSombre}` : 'none' }}
                            >
                                <span
                                    aria-hidden="true"
                                    className="mt-[9px] h-[7px] w-[7px] flex-shrink-0 rounded-full"
                                    style={{ backgroundColor: COLORS.rouge }}
                                />
                                <span className="min-w-0 flex-1">
                                    <span className="block text-xs" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: FONT_BODY }}>
                                        {c.label}
                                    </span>
                                    <span
                                        className="mt-0.5 flex items-center gap-1.5 text-[25px] font-medium"
                                        style={{ color: COLORS.blanc, fontFamily: FONT_TITLE }}
                                    >
                                        {c.value}
                                        {c.external && <ArrowOutIcon />}
                                    </span>
                                </span>
                                <span
                                    className="hidden shrink-0 pt-4 text-right text-xs sm:block"
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
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [sentEmail, setSentEmail] = useState('');

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const subjectRef = useRef(null);
    const messageRef = useRef(null);

    function update(field, value) {
        setForm((f) => ({ ...f, [field]: value }));
        setErrors((e) => {
            if (!e[field]) return e;
            const next = { ...e };
            delete next[field];
            return next;
        });
    }

    function validate(values) {
        const errs = {};
        if (!values.name.trim()) {
            errs.name = 'Indiquez votre nom pour que nous sachions à qui répondre.';
        }
        if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
            errs.email = 'Cette adresse e-mail est incomplète.';
        }
        if (!values.subject) {
            errs.subject = "Précisez l'objet de votre demande.";
        }
        if (values.message.trim().length < 10) {
            errs.message = 'Décrivez votre demande en quelques mots (10 caractères minimum).';
        }
        return errs;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errs = validate(form);
        setErrors(errs);

        if (Object.keys(errs).length > 0) {
            const order = [
                ['name', nameRef],
                ['email', emailRef],
                ['subject', subjectRef],
                ['message', messageRef],
            ];
            const first = order.find(([field]) => errs[field]);
            first?.[1]?.current?.focus();
            return;
        }

        // Envoi simulé pour cette maquette. Pour brancher l'envoi réel avec Inertia :
        // import { useForm } from '@inertiajs/react';
        // const { data, setData, post, processing, errors } = useForm(INITIAL_FORM);
        // post('/contact', { onSuccess: () => { setSentEmail(data.email); setSubmitted(true); } });
        setSentEmail(form.email);
        setSubmitted(true);
    }

    function resetForm() {
        setForm(INITIAL_FORM);
        setErrors({});
        setSubmitted(false);
    }

    return (
        <div className="rounded-[2px] p-6 sm:p-8" style={{ backgroundColor: COLORS.blanc, borderTop: `3px solid ${COLORS.marine}` }}>
            {submitted ? (
                <ConfirmationPanel email={sentEmail} onReset={resetForm} />
            ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <FormField id="name" label="Nom et prénoms" required error={errors.name}>
                            <input
                                id="name"
                                ref={nameRef}
                                value={form.name}
                                onChange={(e) => update('name', e.target.value)}
                                placeholder="Ex : Koffi Jean-Baptiste"
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? 'name-error' : undefined}
                                className={inputClass}
                                style={inputStyle(!!errors.name)}
                            />
                        </FormField>
                        <FormField id="company" label="Société (facultatif)">
                            <input
                                id="company"
                                value={form.company}
                                onChange={(e) => update('company', e.target.value)}
                                placeholder="Ex : SARL Import Export CI"
                                className={inputClass}
                                style={inputStyle(false)}
                            />
                        </FormField>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <FormField id="email" label="E-mail" required error={errors.email}>
                            <input
                                id="email"
                                type="email"
                                ref={emailRef}
                                value={form.email}
                                onChange={(e) => update('email', e.target.value)}
                                placeholder="Ex : nom@societe.ci"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                                className={inputClass}
                                style={inputStyle(!!errors.email)}
                            />
                        </FormField>
                        <FormField id="phone" label="Téléphone (facultatif)">
                            <input
                                id="phone"
                                value={form.phone}
                                onChange={(e) => update('phone', e.target.value)}
                                placeholder="Ex : 07 15 25 89 89"
                                className={inputClass}
                                style={inputStyle(false)}
                            />
                        </FormField>
                    </div>

                    <FormField id="subject" label="Objet de la demande" required error={errors.subject}>
                        <select
                            id="subject"
                            ref={subjectRef}
                            value={form.subject}
                            onChange={(e) => update('subject', e.target.value)}
                            aria-invalid={!!errors.subject}
                            aria-describedby={errors.subject ? 'subject-error' : undefined}
                            className={inputClass}
                            style={inputStyle(!!errors.subject)}
                        >
                            <option value="" disabled>
                                Sélectionnez un objet
                            </option>
                            {SUBJECT_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </FormField>

                    {form.subject === 'suivi' && (
                        <div className="kn-reveal" style={{ borderLeft: `2px solid ${COLORS.rouge}`, paddingLeft: '1rem' }}>
                            <FormField id="reference" label="Référence du dossier ou numéro de conteneur">
                                <input
                                    id="reference"
                                    value={form.reference}
                                    onChange={(e) => update('reference', e.target.value)}
                                    placeholder="Ex : KTL-2026-00417"
                                    className={inputClass}
                                    style={inputStyle(false)}
                                />
                            </FormField>
                            <p className="mt-1.5 text-xs" style={{ color: COLORS.grisSecondaire, fontFamily: FONT_BODY }}>
                                Avec la référence, nous retrouvons votre dossier immédiatement.
                            </p>
                        </div>
                    )}

                    <FormField id="message" label="Message" required error={errors.message}>
                        <textarea
                            id="message"
                            ref={messageRef}
                            value={form.message}
                            onChange={(e) => update('message', e.target.value)}
                            placeholder="Nature de la marchandise, origine et destination, volume ou tonnage, échéance souhaitée…"
                            rows={6}
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? 'message-error' : undefined}
                            className={inputClass}
                            style={inputStyle(!!errors.message)}
                        />
                    </FormField>

                    <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                        <button
                            type="submit"
                            className="kn-btn-primary rounded-[2px] px-7 py-3 text-[19px] font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#DA0910]"
                            style={{ fontFamily: FONT_TITLE }}
                        >
                            Envoyer le message
                        </button>
                        <p className="text-xs" style={{ color: COLORS.grisSecondaire, fontFamily: FONT_BODY }}>
                            Vos informations servent uniquement à traiter votre demande.
                        </p>
                    </div>
                </form>
            )}
        </div>
    );
}

function FormField({ id, label, required, error, children }) {
    return (
        <div>
            <label htmlFor={id} className="mb-1.5 block text-sm font-medium" style={{ color: COLORS.encre, fontFamily: FONT_BODY }}>
                {label}
                {required && <span style={{ color: COLORS.rouge }}> *</span>}
            </label>
            {children}
            {error && (
                <p id={`${id}-error`} className="mt-1.5 text-xs" style={{ color: COLORS.rouge, fontFamily: FONT_BODY }}>
                    {error}
                </p>
            )}
        </div>
    );
}

function ConfirmationPanel({ email, onReset }) {
    return (
        <div role="status" className="rounded-[2px] p-2 sm:p-4" style={{ border: `2px solid ${COLORS.rouge}` }}>
            <h2 style={{ fontFamily: FONT_TITLE, color: COLORS.encre }} className="text-2xl font-semibold">
                Message envoyé
            </h2>
            <p className="mt-3 text-sm" style={{ color: COLORS.grisSecondaire, fontFamily: FONT_BODY }}>
                Nous répondrons à <strong style={{ color: COLORS.encre }}>{email}</strong>.
            </p>
            <p className="mt-2 text-sm" style={{ color: COLORS.grisSecondaire, fontFamily: FONT_BODY }}>
                En cas d'urgence, appelez-nous directement au{' '}
                <a href="tel:+2250715258988" className="font-semibold" style={{ color: COLORS.marine }}>
                    +225 07 15 25 89 88
                </a>
                .
            </p>
            <button
                type="button"
                onClick={onReset}
                className="mt-6 rounded-[2px] px-6 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#DA0910]"
                style={{ border: `1px solid ${COLORS.marine}`, color: COLORS.marine, fontFamily: FONT_BODY }}
            >
                Écrire un autre message
            </button>
        </div>
    );
}

function InfoColumn() {
    return (
        <div className="space-y-10">
            <InfoBlock title="Heures d'ouverture">
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

            <InfoBlock title="Venir nous voir">
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

            <InfoBlock title="Une expédition en cours ?">
                <QuickCallBlock
                    lead="Pour un suivi immédiat, l'appel reste le canal le plus rapide."
                    phoneDisplay="+225 07 15 25 89 88"
                    phoneHref="tel:+2250715258988"
                />
            </InfoBlock>
        </div>
    );
}
