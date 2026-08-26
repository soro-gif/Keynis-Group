import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import StepIndicator from '@/Components/Form/StepIndicator';
import StepNav from '@/Components/Form/StepNav';
import { isStepValid } from '@/utils/steps';

const steps = [
    { title: 'Démarche', required: ['type'] },
    { title: 'Coordonnées', required: ['name', 'phone', 'email'] },
    { title: 'Détails', required: ['subject'] },
];

const typesByCategory = {
    demande: [
        ['demande_produit', 'Demande de produit'],
        ['demande_sourcing', 'Demande de sourcing'],
        ['demande_commodity', 'Demande de commodity'],
        ['demande_logistique', 'Demande logistique'],
        ['recherche_actif', "Recherche d'actif"],
    ],
    offre: [
        ['offre_produit', 'Offre de produit'],
        ['offre_stock', 'Offre de stock'],
        ['offre_producteur', 'Offre producteur'],
        ['offre_fabricant', 'Offre fabricant'],
        ['offre_actif', "Offre d'actif"],
    ],
    partenariat: [
        ['partenariat_fournisseur', 'Devenir fournisseur'],
        ['partenariat_producteur', 'Devenir producteur partenaire'],
        ['partenariat_logistique', 'Devenir partenaire logistique'],
        ['partenariat_distributeur', 'Devenir distributeur'],
    ],
};

function findCategoryForType(type) {
    for (const [category, types] of Object.entries(typesByCategory)) {
        if (types.some(([value]) => value === type)) return category;
    }
    return 'demande';
}

export default function RfqCreate({ presetType }) {
    const { props } = usePage();
    const flashSuccess = props.flash?.success;

    const initialSubject = typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('subject') || ''
        : '';

    const [category, setCategory] = useState(presetType ? findCategoryForType(presetType) : 'demande');
    const [step, setStep] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        category,
        type: presetType || typesByCategory[category][0][0],
        name: '',
        company: '',
        phone: '',
        whatsapp: '',
        email: '',
        country: '',
        city: '',
        subject: initialSubject,
        description: '',
        quantity: '',
        budget: '',
        deadline: '',
        delivery_location: '',
    });

    useEffect(() => {
        setData('category', category);
        if (!typesByCategory[category].some(([v]) => v === data.type)) {
            setData('type', typesByCategory[category][0][0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    function submit(e) {
        e.preventDefault();
        if (step < steps.length - 1) {
            if (!isStepValid(data, steps[step].required)) return;
            setStep((s) => s + 1);
            return;
        }
        post('/rfq', {
            preserveScroll: true,
            onSuccess: () => {
                reset('subject', 'description', 'quantity', 'budget', 'deadline', 'delivery_location');
                setStep(0);
            },
        });
    }

    return (
        <SiteLayout title="Contact / RFQ">
            <PageHero
                eyebrow="Contact / RFQ"
                title="Demande, offre ou partenariat"
                description="Sélectionnez le type de démarche qui correspond à votre besoin. Une référence vous sera communiquée après envoi."
            />

            <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                {flashSuccess && (
                    <div className="mb-8 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-700">
                        {flashSuccess}
                    </div>
                )}

                <div className="mb-8 flex flex-wrap gap-2">
                    {[
                        ['demande', 'Je fais une demande'],
                        ['offre', 'Je propose une offre'],
                        ['partenariat', 'Je deviens partenaire'],
                    ].map(([value, label]) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => { setCategory(value); setStep(0); }}
                            className={`rounded-full px-5 py-2.5 text-sm font-bold ${category === value ? 'bg-keynis-navy text-white' : 'bg-keynis-gray text-slate-600'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <StepIndicator steps={steps.map((s) => s.title)} current={step} />

                    {step === 0 && (
                        <Field label="Type de démarche" error={errors.type}>
                            <select value={data.type} onChange={(e) => setData('type', e.target.value)} className="input">
                                {typesByCategory[category].map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </Field>
                    )}

                    {step === 1 && (
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Nom" error={errors.name}>
                                <input value={data.name} onChange={(e) => setData('name', e.target.value)} className="input" />
                            </Field>
                            <Field label="Entreprise" error={errors.company}>
                                <input value={data.company} onChange={(e) => setData('company', e.target.value)} className="input" />
                            </Field>
                            <Field label="Téléphone" error={errors.phone}>
                                <input value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="input" />
                            </Field>
                            <Field label="WhatsApp" error={errors.whatsapp}>
                                <input value={data.whatsapp} onChange={(e) => setData('whatsapp', e.target.value)} className="input" />
                            </Field>
                            <Field label="E-mail" error={errors.email}>
                                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="input" />
                            </Field>
                            <Field label="Pays" error={errors.country}>
                                <input value={data.country} onChange={(e) => setData('country', e.target.value)} className="input" />
                            </Field>
                            <Field label="Ville" error={errors.city}>
                                <input value={data.city} onChange={(e) => setData('city', e.target.value)} className="input" />
                            </Field>
                        </div>
                    )}

                    {step === 2 && (
                        <>
                            <Field label="Produit / commodity / service concerné" error={errors.subject}>
                                <input value={data.subject} onChange={(e) => setData('subject', e.target.value)} className="input" />
                            </Field>

                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Quantité" error={errors.quantity}>
                                    <input value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} className="input" />
                                </Field>
                                <Field label="Budget éventuel" error={errors.budget}>
                                    <input value={data.budget} onChange={(e) => setData('budget', e.target.value)} className="input" />
                                </Field>
                                <Field label="Délai souhaité" error={errors.deadline}>
                                    <input type="date" value={data.deadline} onChange={(e) => setData('deadline', e.target.value)} className="input" />
                                </Field>
                                <Field label="Lieu de livraison" error={errors.delivery_location}>
                                    <input value={data.delivery_location} onChange={(e) => setData('delivery_location', e.target.value)} className="input" />
                                </Field>
                            </div>

                            <Field label="Description / commentaire" error={errors.description}>
                                <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="input" rows={4} />
                            </Field>
                        </>
                    )}

                    <StepNav
                        step={step}
                        isLast={step === steps.length - 1}
                        onBack={() => setStep((s) => s - 1)}
                        processing={processing}
                        submitLabel="Envoyer ma demande"
                        nextDisabled={!isStepValid(data, steps[step].required)}
                    />
                </form>
            </section>
        </SiteLayout>
    );
}

function Field({ label, error, children }) {
    return (
        <label className="block">
            <span className="mb-1 block text-sm font-semibold text-keynis-navy">{label}</span>
            {children}
            {error && <span className="mt-1 block text-xs text-keynis-red">{error}</span>}
        </label>
    );
}
