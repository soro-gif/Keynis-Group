import { useEffect, useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import { BrandFonts, BrandStyles } from '@/Components/Site/Brand';
import { COLORS, FONT_BODY, FONT_TITLE } from '@/lib/brand';

const MAPS_URL = 'https://maps.app.goo.gl/EBVS3c2AgTVtn1RW8';

const CONTACT_DETAILS = [
    {
        icon: 'phone',
        title: 'Appelez-nous',
        content: (
            <div className="space-y-1">
                <a href="tel:+2252722584016" className="block hover:underline">+225 27 22 58 40 16</a>
                <a href="tel:+2250715258988" className="block hover:underline">+225 07 15 25 89 88</a>
            </div>
        ),
    },
    {
        icon: 'location',
        title: 'Emplacement',
        content: (
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
                <span>Angré Les Oscars<br />Cocody, Abidjan, Côte d’Ivoire</span>
                <ContactIcon name="external" className="h-4 w-4" />
            </a>
        ),
    },
    {
        icon: 'clock',
        title: 'Heures de travail',
        content: (
            <div className="space-y-1">
                <p>Lun – Ven : 08h00 – 17h30</p>
                <p>Sam : 08h00 – 12h30 · Dim : Fermé</p>
                <p className="pt-1 text-xs" style={{ color: COLORS.grisSecondaire }}>Heure d’Abidjan (GMT)</p>
            </div>
        ),
    },
];

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
    return (
        <SiteLayout
            title="Contact"
            description="Contactez Keynis Trading & Logistics Group à Abidjan pour vos demandes de négoce, transport et logistique."
        >
            <BrandFonts />
            <BrandStyles />

            <section className="relative isolate overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24" style={{ backgroundColor: COLORS.grisPortuaire }}>
                <ContactBackdrop />

                <div
                    className="relative mx-auto grid max-w-[1120px] overflow-hidden rounded-[2px] lg:grid-cols-[1.03fr_0.97fr]"
                    style={{ backgroundColor: COLORS.blanc, boxShadow: '0 22px 55px rgba(6,16,58,0.13)' }}
                >
                    <ContactInformation />
                    <ContactForm />
                </div>
            </section>
        </SiteLayout>
    );
}

function ContactInformation() {
    return (
        <div className="relative px-7 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-20">
            <div className="mb-10 max-w-md">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.rouge, fontFamily: FONT_BODY }}>
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.rouge }} />
                    Keynis Trading & Logistics Group
                </p>
                <h1
                    className="text-[38px] font-semibold leading-[1.02] sm:text-[48px]"
                    style={{ color: COLORS.marineProfond, fontFamily: FONT_TITLE }}
                >
                    Une équipe disponible à Abidjan.
                </h1>
                <p className="mt-5 max-w-[55ch] text-[15px] leading-7" style={{ color: COLORS.grisSecondaire, fontFamily: FONT_BODY }}>
                    Un devis, une expédition à suivre ou une formalité à clarifier ? Contactez directement notre équipe opérationnelle.
                </p>
            </div>

            <div className="space-y-8">
                {CONTACT_DETAILS.map((detail) => (
                    <div key={detail.title} className="grid grid-cols-[36px_1fr] gap-4">
                        <span
                            className="flex h-9 w-9 items-center justify-center rounded-full"
                            style={{ backgroundColor: 'rgba(218,9,16,0.09)', color: COLORS.rouge }}
                        >
                            <ContactIcon name={detail.icon} />
                        </span>
                        <div>
                            <h2 className="text-[17px] font-semibold" style={{ color: COLORS.encre, fontFamily: FONT_TITLE }}>
                                {detail.title}
                            </h2>
                            <div className="mt-2 text-[14px] leading-6" style={{ color: COLORS.encre, fontFamily: FONT_BODY }}>
                                {detail.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ContactForm() {
    const { props } = usePage();
    const flashSuccess = props.flash?.success;

    const { data, setData, post, processing, errors, reset } = useForm(INITIAL_FORM);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const subjectRef = useRef(null);
    const messageRef = useRef(null);

    useEffect(() => {
        const firstError = [
            ['name', nameRef],
            ['email', emailRef],
            ['subject', subjectRef],
            ['message', messageRef],
        ].find(([field]) => errors[field]);

        firstError?.[1]?.current?.focus();
    }, [errors]);

    function submit(event) {
        event.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset('name', 'email', 'subject', 'message'),
        });
    }

    return (
        <div className="flex items-center px-7 py-12 sm:px-12 lg:px-14 lg:py-16" style={{ backgroundColor: '#D9DCE3' }}>
            <form onSubmit={submit} noValidate className="w-full">
                <div className="mb-8 flex items-center justify-between gap-5">
                    <div>
                        <p className="mb-1 text-xs font-semibold" style={{ color: COLORS.rouge, fontFamily: FONT_BODY }}>Réponse sous 24 h ouvrées</p>
                        <h2 className="text-[34px] font-bold leading-none sm:text-[40px]" style={{ color: COLORS.marineProfond, fontFamily: FONT_TITLE }}>
                            Nous contacter
                        </h2>
                    </div>
                    <span className="hidden h-12 w-12 items-center justify-center rounded-full sm:flex" style={{ backgroundColor: COLORS.marine, color: COLORS.blanc }}>
                        <ContactIcon name="message" className="h-5 w-5" />
                    </span>
                </div>

                {flashSuccess && (
                    <div
                        role="status"
                        className="mb-6 flex items-center gap-3 rounded-lg p-4"
                        style={{ backgroundColor: COLORS.blanc, border: `1px solid ${COLORS.marine}` }}
                    >
                        <span
                            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white"
                            style={{ backgroundColor: COLORS.marine }}
                        >
                            <ContactIcon name="check" className="h-4 w-4" />
                        </span>
                        <p className="text-sm" style={{ color: COLORS.encre, fontFamily: FONT_BODY }}>
                            {flashSuccess}
                        </p>
                    </div>
                )}

                <div className="space-y-5">
                    <FormInput
                        id="contact-name"
                        label="Nom et prénoms"
                        placeholder="Entrez votre nom"
                        value={data.name}
                        onChange={(event) => setData('name', event.target.value)}
                        error={errors.name}
                        inputRef={nameRef}
                    />
                    <FormInput
                        id="contact-email"
                        type="email"
                        label="Adresse e-mail"
                        placeholder="Entrez une adresse e-mail valide"
                        value={data.email}
                        onChange={(event) => setData('email', event.target.value)}
                        error={errors.email}
                        inputRef={emailRef}
                    />
                    <FormInput
                        id="contact-subject"
                        label="Objet"
                        placeholder="Objet de votre demande"
                        value={data.subject}
                        onChange={(event) => setData('subject', event.target.value)}
                        error={errors.subject}
                        inputRef={subjectRef}
                    />

                    <div>
                        <label htmlFor="contact-message" className="sr-only">Votre message</label>
                        <textarea
                            id="contact-message"
                            ref={messageRef}
                            rows={6}
                            value={data.message}
                            onChange={(event) => setData('message', event.target.value)}
                            placeholder="Décrivez votre demande : marchandise, origine, destination, volume et échéance…"
                            aria-invalid={Boolean(errors.message)}
                            aria-describedby={errors.message ? 'contact-message-error' : undefined}
                            className="w-full resize-y rounded-lg border-0 bg-white px-5 py-4 text-[15px] leading-6 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]"
                            style={{ color: COLORS.encre, outlineColor: COLORS.rouge, fontFamily: FONT_BODY }}
                        />
                        {errors.message && <ErrorMessage id="contact-message-error">{errors.message}</ErrorMessage>}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] disabled:opacity-60"
                    style={{ backgroundColor: COLORS.rouge, outlineColor: COLORS.marine, fontFamily: FONT_BODY }}
                >
                    {processing ? 'Envoi en cours…' : 'Envoyer le message'}
                    <ContactIcon name="send" className="h-4 w-4" />
                </button>

                <p className="mt-4 text-center text-xs leading-5" style={{ color: COLORS.grisSecondaire, fontFamily: FONT_BODY }}>
                    Vos informations servent uniquement à traiter votre demande.
                </p>
            </form>
        </div>
    );
}

function FormInput({ id, type = 'text', label, placeholder, value, onChange, error, inputRef }) {
    return (
        <div>
            <label htmlFor={id} className="sr-only">{label}</label>
            <input
                id={id}
                ref={inputRef}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                className="w-full rounded-lg border-0 bg-white px-5 py-4 text-[15px] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]"
                style={{ color: COLORS.encre, outlineColor: COLORS.rouge, fontFamily: FONT_BODY }}
            />
            {error && <ErrorMessage id={`${id}-error`}>{error}</ErrorMessage>}
        </div>
    );
}

function ErrorMessage({ id, children }) {
    return <p id={id} className="mt-1.5 text-xs" style={{ color: COLORS.rouge, fontFamily: FONT_BODY }}>{children}</p>;
}

function ContactBackdrop() {
    return (
        <svg aria-hidden="true" viewBox="0 0 1440 760" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full opacity-100">
            <path d="M0 0h510c80 55 115 112 100 173-19 76-111 78-174 31C330 126 227 86 0 172V0Z" fill={COLORS.rouge} opacity="0.92" />
            <path d="M1055 0h385v232c-117 26-207 6-266-60-43-48-82-106-119-172Z" fill={COLORS.marineProfond} opacity="0.9" />
            <path d="M1138 181c88 32 171 42 302 15v74c-135 30-235 16-324-25l22-64Z" fill={COLORS.rouge} opacity="0.9" />
            <path d="M1110 0c74 86 122 133 330 102" fill="none" stroke="white" strokeOpacity="0.42" strokeWidth="5" />
        </svg>
    );
}

function ContactIcon({ name, className = 'h-[18px] w-[18px]' }) {
    const common = {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.9,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
    };

    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={className} {...common}>
            {name === 'phone' && <path d="M7.4 3.5 9.6 8 7.8 9.7a15.1 15.1 0 0 0 6.5 6.5l1.7-1.8 4.5 2.2v2.6a1.8 1.8 0 0 1-2 1.8A17.4 17.4 0 0 1 3 5.5a1.8 1.8 0 0 1 1.8-2h2.6Z" />}
            {name === 'location' && <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.4" /></>}
            {name === 'clock' && <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>}
            {name === 'external' && <><path d="M9 5H5v14h14v-4" /><path d="M13 5h6v6M19 5l-8 8" /></>}
            {name === 'message' && <><path d="M4 4.5h16v12H9l-5 4v-16Z" /><path d="M8 9h8M8 12.5h5" /></>}
            {name === 'send' && <><path d="m3 11 18-8-8 18-2-8-8-2Z" /><path d="m11 13 4-4" /></>}
            {name === 'check' && <path d="m5 12 4 4L19 6" />}
        </svg>
    );
}
