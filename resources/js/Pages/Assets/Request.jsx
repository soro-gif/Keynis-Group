import { useEffect, useRef } from 'react';
import { Link, useForm } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';

const INITIAL_FORM = {
    name: '',
    company: '',
    phone: '',
    whatsapp: '',
    email: '',
    start_date: '',
    duration: '',
    pickup_location: '',
    message: '',
};

function priceLabel(asset) {
    if (asset.price_per_day) return `${asset.price_per_day} FCFA / jour`;
    if (asset.price_per_mission) return `${asset.price_per_mission} FCFA / mission`;
    return asset.indicative_price || 'Sur demande';
}

export default function AssetRequest({ asset }) {
    const { data, setData, post, processing, errors } = useForm(INITIAL_FORM);
    const firstErrorRef = useRef(null);
    const refs = {
        name: useRef(null),
        phone: useRef(null),
        email: useRef(null),
    };

    useEffect(() => {
        const field = ['name', 'phone', 'email'].find((key) => errors[key]);
        (field ? refs[field] : firstErrorRef).current?.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    function submit(event) {
        event.preventDefault();
        post(`/actifs/${asset.id}/demande`, { preserveScroll: true });
    }

    return (
        <SiteLayout
            title={`Demander : ${asset.name}`}
            description={`Formulaire de demande pour l'actif ${asset.name} — Keynis Trading & Logistics Group.`}
        >
            <PageHero
                eyebrow="Location & Actifs"
                title="Demander cet actif"
                description="Renseignez vos coordonnées et vos besoins. Notre équipe revient vers vous rapidement pour confirmer la disponibilité et les modalités."
            />

            <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <nav className="mb-6 text-sm text-slate-500">
                    <Link href="/actifs" className="hover:text-keynis-navy">Location & Actifs</Link>
                    {' / '}
                    <Link href={`/actifs/${asset.id}`} className="hover:text-keynis-navy">{asset.name}</Link>
                    {' / '}
                    <span className="text-keynis-navy">Demande</span>
                </nav>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="rounded-2xl bg-keynis-gray p-6 lg:order-2">
                        <p className="text-xs font-bold uppercase tracking-wide text-keynis-navy">Actif sélectionné</p>
                        <p className="mt-2 text-lg font-extrabold text-keynis-navy">{asset.name}</p>
                        {(asset.brand || asset.model) && (
                            <p className="text-sm text-slate-500">{[asset.brand, asset.model].filter(Boolean).join(' ')}</p>
                        )}
                        {asset.location && (
                            <p className="mt-3 text-sm text-slate-600">
                                <span className="font-semibold text-keynis-navy">Localisation : </span>
                                {asset.location}
                            </p>
                        )}
                        <p className="mt-3 text-sm">
                            <span className="font-semibold text-keynis-navy">Tarif : </span>
                            <span className="text-slate-600">{priceLabel(asset)}</span>
                        </p>
                        <p className="mt-6 text-xs leading-5 text-slate-500">
                            Vos informations servent uniquement à traiter cette demande de location.
                        </p>
                    </div>

                    <form onSubmit={submit} noValidate className="lg:col-span-2 lg:order-1">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                            <h2 className="text-sm font-bold uppercase tracking-wide text-keynis-navy">Vos coordonnées</h2>
                            <div className="mt-4 grid gap-5 sm:grid-cols-2">
                                <Field
                                    id="req-name"
                                    label="Nom et prénoms"
                                    required
                                    value={data.name}
                                    onChange={(v) => setData('name', v)}
                                    error={errors.name}
                                    inputRef={refs.name}
                                />
                                <Field
                                    id="req-company"
                                    label="Société (optionnel)"
                                    value={data.company}
                                    onChange={(v) => setData('company', v)}
                                    error={errors.company}
                                />
                                <Field
                                    id="req-phone"
                                    label="Téléphone"
                                    required
                                    value={data.phone}
                                    onChange={(v) => setData('phone', v)}
                                    error={errors.phone}
                                    inputRef={refs.phone}
                                />
                                <Field
                                    id="req-whatsapp"
                                    label="WhatsApp (optionnel)"
                                    value={data.whatsapp}
                                    onChange={(v) => setData('whatsapp', v)}
                                    error={errors.whatsapp}
                                />
                                <Field
                                    id="req-email"
                                    type="email"
                                    label="Adresse e-mail"
                                    required
                                    value={data.email}
                                    onChange={(v) => setData('email', v)}
                                    error={errors.email}
                                    inputRef={refs.email}
                                />
                            </div>

                            <h2 className="mt-8 text-sm font-bold uppercase tracking-wide text-keynis-navy">Votre besoin</h2>
                            <div className="mt-4 grid gap-5 sm:grid-cols-2">
                                <Field
                                    id="req-start-date"
                                    type="date"
                                    label="Date de début souhaitée (optionnel)"
                                    value={data.start_date}
                                    onChange={(v) => setData('start_date', v)}
                                    error={errors.start_date}
                                />
                                <Field
                                    id="req-duration"
                                    label="Durée souhaitée (optionnel)"
                                    placeholder="Ex : 3 jours, 2 semaines…"
                                    value={data.duration}
                                    onChange={(v) => setData('duration', v)}
                                    error={errors.duration}
                                />
                                <Field
                                    id="req-pickup"
                                    label="Lieu de prise en charge (optionnel)"
                                    value={data.pickup_location}
                                    onChange={(v) => setData('pickup_location', v)}
                                    error={errors.pickup_location}
                                    className="sm:col-span-2"
                                />
                            </div>

                            <div className="mt-5">
                                <label htmlFor="req-message" className="mb-1.5 block text-sm font-semibold text-keynis-navy">
                                    Message / précisions (optionnel)
                                </label>
                                <textarea
                                    id="req-message"
                                    rows={5}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder="Précisez le contexte de votre besoin, avec ou sans chauffeur, etc."
                                    className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm text-keynis-navy outline-none focus:border-keynis-red focus:ring-1 focus:ring-keynis-red"
                                />
                                {errors.message && <p className="mt-1.5 text-xs text-keynis-red">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-8 w-full rounded-full bg-keynis-red px-6 py-3.5 text-sm font-bold text-white hover:bg-keynis-red-dark disabled:opacity-60 sm:w-auto"
                            >
                                {processing ? 'Envoi en cours…' : 'Envoyer ma demande'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </SiteLayout>
    );
}

function Field({ id, type = 'text', label, placeholder, required, value, onChange, error, inputRef, className = '' }) {
    return (
        <div className={className}>
            <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-keynis-navy">
                {label}
                {required && <span className="text-keynis-red"> *</span>}
            </label>
            <input
                id={id}
                ref={inputRef}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-keynis-navy outline-none focus:border-keynis-red focus:ring-1 focus:ring-keynis-red"
            />
            {error && <p id={`${id}-error`} className="mt-1.5 text-xs text-keynis-red">{error}</p>}
        </div>
    );
}
