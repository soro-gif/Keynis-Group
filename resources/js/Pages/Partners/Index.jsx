import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import Reveal from '@/Components/Motion/Reveal';
import ImageField from '@/Components/Form/ImageField';
import StepIndicator from '@/Components/Form/StepIndicator';
import StepNav from '@/Components/Form/StepNav';
import { isStepValid } from '@/utils/steps';
import { mediaUrl } from '@/utils/media';

const steps = [
    { title: 'Entreprise', required: ['category', 'company_name'], fields: ['logo', 'category', 'company_name', 'sector'] },
    { title: 'Contact', required: ['contact_name', 'country', 'phone', 'email'], fields: ['contact_name', 'country', 'city', 'phone', 'whatsapp', 'email', 'website'] },
    { title: 'Activité', required: [], fields: ['products_services', 'capacities', 'coverage_area', 'message'] },
];

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

export default function PartnersIndex({ partners }) {
    return (
        <SiteLayout
            title="Partenaires"
            description="Le réseau structuré de partenaires Keynis : producteurs, coopératives, fabricants, fournisseurs, transporteurs et distributeurs."
        >
            <PageHero
                eyebrow="Partenaires"
                title="Un réseau structuré de partenaires"
                description="Producteurs, coopératives, fabricants, fournisseurs, transporteurs et distributeurs."
            />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {partners.length > 0 && (
                    <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {partners.map((p, i) => (
                            <Reveal key={p.id} index={i} className="flex items-start gap-4 rounded-xl border border-slate-200 p-5">
                                {mediaUrl(p.logo) ? (
                                    <img src={mediaUrl(p.logo)} alt={p.company_name} className="h-12 w-12 shrink-0 rounded-lg border border-slate-200 object-contain p-1" />
                                ) : (
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-keynis-gray text-xs font-bold text-slate-400">
                                        {p.company_name?.[0]}
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">
                                        {categoryOptions.find(([v]) => v === p.category)?.[1] || p.category}
                                    </p>
                                    <h3 className="mt-1 font-bold text-keynis-navy">{p.company_name}</h3>
                                    <p className="text-sm text-slate-500">{[p.city, p.country].filter(Boolean).join(', ')}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                )}

                <div className="grid gap-10 lg:grid-cols-2">
                    <div>
                        <h2 className="text-2xl font-extrabold text-keynis-navy">Devenir partenaire Keynis</h2>
                        <p className="mt-3 text-slate-600">
                            Rejoignez notre réseau de fournisseurs, producteurs, transporteurs et distributeurs pour
                            accéder à de nouvelles opportunités commerciales.
                        </p>
                    </div>
                    <PartnerForm />
                </div>
            </section>
        </SiteLayout>
    );
}

function PartnerForm() {
    const [step, setStep] = useState(0);
    const { data, setData, post, processing, errors } = useForm({
        category: '',
        company_name: '',
        contact_name: '',
        country: '',
        city: '',
        phone: '',
        whatsapp: '',
        email: '',
        website: '',
        sector: '',
        products_services: '',
        capacities: '',
        coverage_area: '',
        message: '',
        logo: null,
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
        post('/partenaires', { preserveScroll: true, forceFormData: true });
    }

    return (
        <form onSubmit={submit} className="space-y-4 rounded-2xl bg-keynis-gray p-8">

            <StepIndicator steps={steps.map((s) => s.title)} current={step} />

            {step === 0 && (
                <>
                    <ImageField label="Logo de l'entreprise" value={data.logo} onChange={(file) => setData('logo', file)} error={errors.logo} />

                    <Field label="Catégorie" required error={errors.category}>
                        <select value={data.category} onChange={(e) => setData('category', e.target.value)} required className="input">
                            <option value="">Sélectionner...</option>
                            {categoryOptions.map(([v, l]) => (
                                <option key={v} value={v}>{l}</option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Raison sociale" required error={errors.company_name}>
                        <input
                            value={data.company_name}
                            onChange={(e) => setData('company_name', e.target.value)}
                            placeholder="Ex : Keynis Trading & Logistics"
                            required
                            className="input"
                        />
                    </Field>

                    <Field label="Secteur d'activité" error={errors.sector}>
                        <input
                            value={data.sector}
                            onChange={(e) => setData('sector', e.target.value)}
                            placeholder="Ex : Agro-industrie, transport, BTP..."
                            className="input"
                        />
                    </Field>
                </>
            )}

            {step === 1 && (
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Nom du responsable" required error={errors.contact_name}>
                        <input
                            value={data.contact_name}
                            onChange={(e) => setData('contact_name', e.target.value)}
                            placeholder="Ex : Koffi Jean-Baptiste"
                            required
                            className="input"
                        />
                    </Field>
                    <Field label="Pays" required error={errors.country}>
                        <input
                            value={data.country}
                            onChange={(e) => setData('country', e.target.value)}
                            placeholder="Ex : Côte d'Ivoire"
                            required
                            className="input"
                        />
                    </Field>
                    <Field label="Ville" error={errors.city}>
                        <input value={data.city} onChange={(e) => setData('city', e.target.value)} placeholder="Ex : Abidjan" className="input" />
                    </Field>
                    <Field label="Téléphone" required error={errors.phone}>
                        <input
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="Ex : 07 15 25 89 89"
                            required
                            className="input"
                        />
                    </Field>
                    <Field label="WhatsApp" error={errors.whatsapp}>
                        <input
                            value={data.whatsapp}
                            onChange={(e) => setData('whatsapp', e.target.value)}
                            placeholder="Si différent du téléphone"
                            className="input"
                        />
                    </Field>
                    <Field label="E-mail" required error={errors.email}>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Ex : nom@entreprise.com"
                            required
                            className="input"
                        />
                    </Field>
                    <Field label="Site internet" error={errors.website}>
                        <input
                            value={data.website}
                            onChange={(e) => setData('website', e.target.value)}
                            placeholder="Ex : www.entreprise.com"
                            className="input"
                        />
                    </Field>
                </div>
            )}

            {step === 2 && (
                <>
                    <Field label="Produits / services proposés" error={errors.products_services}>
                        <textarea
                            value={data.products_services}
                            onChange={(e) => setData('products_services', e.target.value)}
                            placeholder="Ex : Cacao, café, transport routier..."
                            className="input"
                            rows={2}
                        />
                    </Field>

                    <Field label="Capacités" error={errors.capacities}>
                        <textarea
                            value={data.capacities}
                            onChange={(e) => setData('capacities', e.target.value)}
                            placeholder="Ex : 500 tonnes/mois, 10 véhicules disponibles..."
                            className="input"
                            rows={2}
                        />
                    </Field>

                    <Field label="Zone d'intervention" error={errors.coverage_area}>
                        <input
                            value={data.coverage_area}
                            onChange={(e) => setData('coverage_area', e.target.value)}
                            placeholder="Ex : Abidjan, national, sous-région..."
                            className="input"
                        />
                    </Field>

                    <Field label="Message" error={errors.message}>
                        <textarea
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            placeholder="Informations complémentaires utiles à votre candidature..."
                            className="input"
                            rows={3}
                        />
                    </Field>
                </>
            )}

            <StepNav
                step={step}
                isLast={step === steps.length - 1}
                onBack={() => setStep((s) => s - 1)}
                processing={processing}
                submitLabel="Envoyer ma candidature"
                nextDisabled={!isStepValid(data, steps[step].required)}
            />
        </form>
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
