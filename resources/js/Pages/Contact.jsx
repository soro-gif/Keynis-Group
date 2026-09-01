import { useForm } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import { BrandFonts } from '@/Components/Site/Brand';
import { COLORS, FONT_TITLE, FONT_BODY } from '@/lib/brand';

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Angr%C3%A9+Les+Oscars%2C+Cocody%2C+Abidjan%2C+C%C3%B4te+d%27Ivoire';

export default function Contact() {
    return (
        <SiteLayout
            title="Contact"
            description="Contactez Keynis Trading & Logistics Group pour un devis, le suivi d'une expédition ou une formalité douanière. Réponse sous 24 h ouvrées."
        >
            <BrandFonts />

            <PageHero
                eyebrow="Contact"
                title="Parlons de votre prochaine expédition"
                description="Une question, un devis, un suivi d'expédition ? Notre équipe vous répond sous 24 h ouvrées."
            />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="space-y-8">
                        <InfoRow icon="phone" label="Appelez-nous">
                            <a href="tel:+2252722584016" className="hover:underline" style={linkStyle}>
                                +225 27 22 58 40 16
                            </a>
                            {', '}
                            <a href="tel:+2250715258988" className="hover:underline" style={linkStyle}>
                                +225 07 15 25 89 88
                            </a>
                        </InfoRow>

                        <InfoRow icon="mail" label="E-mail">
                            <a href="mailto:info@keynisgroup.ci" className="hover:underline" style={linkStyle}>
                                info@keynisgroup.ci
                            </a>
                        </InfoRow>

                        <InfoRow icon="location" label="Emplacement">
                            Angré Les Oscars, Cocody, Abidjan, Côte d'Ivoire
                            <br />
                            <a
                                href={MAPS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 inline-block hover:underline"
                                style={linkStyle}
                            >
                                Ouvrir dans Google Maps
                            </a>
                        </InfoRow>

                        <InfoRow icon="clock" label="Heures de travail">
                            Lun – Ven ...... 08h00 – 17h30
                            <br />
                            Sam ...... 08h00 – 12h30
                            <br />
                            Dim ...... Fermé
                            <br />
                            <span className="text-xs" style={{ color: COLORS.grisSecondaire }}>Heure d'Abidjan (GMT)</span>
                        </InfoRow>
                    </div>

                    <ContactFormCard />
                </div>
            </section>
        </SiteLayout>
    );
}

const linkStyle = { color: COLORS.marine, fontFamily: FONT_BODY };

function InfoRow({ icon, label, children }) {
    return (
        <div>
            <div className="flex items-center gap-2.5">
                <span style={{ color: COLORS.rouge }}>
                    <ContactIcon name={icon} />
                </span>
                <h3
                    className="text-sm font-bold uppercase tracking-wide"
                    style={{ color: COLORS.encre, fontFamily: FONT_BODY }}
                >
                    {label}
                </h3>
            </div>
            <div className="mt-2 pl-[26px] text-sm" style={{ color: COLORS.grisSecondaire, fontFamily: FONT_BODY, lineHeight: 1.6 }}>
                {children}
            </div>
        </div>
    );
}

function ContactFormCard() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        message: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/contact', { preserveScroll: true });
    }

    return (
        <div className="rounded-[2px] p-8" style={{ backgroundColor: COLORS.grisPortuaire }}>
            <h2
                className="mb-6 text-2xl font-semibold"
                style={{ fontFamily: FONT_TITLE, color: COLORS.encre }}
            >
                Nous contacter
            </h2>

            <form onSubmit={submit} className="space-y-4">
                <Field error={errors.name}>
                    <input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Entrez votre nom"
                        required
                        className="input"
                    />
                </Field>

                <Field error={errors.email}>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Entrez une adresse e-mail valide"
                        required
                        className="input"
                    />
                </Field>

                <Field error={errors.message}>
                    <textarea
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        placeholder="Votre message"
                        required
                        rows={5}
                        className="input"
                    />
                </Field>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: COLORS.marine, fontFamily: FONT_TITLE }}
                >
                    Soumettre
                </button>
            </form>
        </div>
    );
}

function Field({ error, children }) {
    return (
        <div>
            {children}
            {error && (
                <p className="mt-1 text-xs" style={{ color: COLORS.rouge, fontFamily: FONT_BODY }}>
                    {error}
                </p>
            )}
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
            {name === 'mail' && <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>}
            {name === 'location' && <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.4" /></>}
            {name === 'clock' && <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>}
        </svg>
    );
}
