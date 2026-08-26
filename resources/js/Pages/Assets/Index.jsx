import { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import Reveal from '@/Components/Motion/Reveal';
import ImageField from '@/Components/Form/ImageField';
import StepIndicator from '@/Components/Form/StepIndicator';
import StepNav from '@/Components/Form/StepNav';
import { isStepValid } from '@/utils/steps';
import { firstImage } from '@/utils/media';

const proposeSteps = [
    { title: 'Actif', required: ['category_id', 'name'] },
    { title: 'Détails', required: [] },
    { title: 'Propriétaire', required: ['owner_name', 'owner_phone'] },
];

const families = [
    { value: 'vehicules', label: 'Véhicules' },
    { value: 'engins_btp', label: 'Engins BTP' },
    { value: 'machines_agricoles', label: 'Machines agricoles' },
    { value: 'equipements', label: 'Équipements' },
    { value: 'infrastructures', label: 'Infrastructures' },
];

export default function AssetsIndex({ assets, categories, filters }) {
    const [tab, setTab] = useState('parcourir');

    return (
        <SiteLayout title="Location & Mobilisation d'actifs">
            <PageHero
                eyebrow="Location & Actifs"
                title="Véhicules, engins BTP, machines et infrastructures"
                description="Keynis connecte propriétaires d'actifs et entreprises ayant des besoins de mobilisation."
            />

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-wrap gap-2 border-b border-slate-200">
                    {[
                        ['parcourir', 'Parcourir les actifs'],
                        ['recherche', 'Je recherche un actif'],
                        ['propose', 'Je propose un actif'],
                    ].map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setTab(key)}
                            className={`px-4 py-3 text-sm font-bold ${tab === key ? 'border-b-2 border-keynis-red text-keynis-red' : 'text-slate-500'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {tab === 'parcourir' && (
                    <BrowseAssets assets={assets} categories={categories} filters={filters} />
                )}
                {tab === 'recherche' && <SearchAssetForm categories={categories} />}
                {tab === 'propose' && <ProposeAssetForm categories={categories} />}
            </section>
        </SiteLayout>
    );
}

function BrowseAssets({ assets, categories, filters }) {
    function filterByFamily(family) {
        router.get('/actifs', { ...filters, family: family || undefined, category: undefined }, { preserveState: true });
    }

    return (
        <div className="mt-8">
            <div className="mb-6 flex flex-wrap gap-2">
                <button
                    onClick={() => filterByFamily(null)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${!filters?.family ? 'bg-keynis-navy text-white' : 'bg-keynis-gray text-slate-600'}`}
                >
                    Toutes catégories
                </button>
                {families.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => filterByFamily(f.value)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${filters?.family === f.value ? 'bg-keynis-navy text-white' : 'bg-keynis-gray text-slate-600'}`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {assets.data.map((asset, i) => (
                    <Reveal key={asset.id} index={i} className="overflow-hidden rounded-2xl border border-slate-200">
                        <div className="aspect-[4/3] w-full bg-keynis-gray">
                            {firstImage(asset.photos) ? (
                                <img src={firstImage(asset.photos)} alt={asset.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">Pas de photo</div>
                            )}
                        </div>
                        <div className="p-6">
                            {asset.category && (
                                <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">{asset.category.name}</p>
                            )}
                            <h3 className="mt-2 text-lg font-bold text-keynis-navy">{asset.name}</h3>
                            {asset.brand && <p className="text-sm text-slate-500">{asset.brand} {asset.model}</p>}
                            {asset.location && <p className="mt-1 text-sm text-slate-500">📍 {asset.location}</p>}
                            <Link
                                href={`/rfq?type=recherche_actif&subject=${encodeURIComponent(asset.name)}`}
                                className="mt-4 inline-block text-sm font-bold text-keynis-red hover:underline"
                            >
                                Demander cet actif →
                            </Link>
                        </div>
                    </Reveal>
                ))}
            </div>

            {assets.data.length === 0 && (
                <p className="text-slate-500">Aucun actif publié pour le moment.</p>
            )}
        </div>
    );
}

function SearchAssetForm({ categories }) {
    return (
        <div className="mt-8 max-w-2xl rounded-2xl bg-keynis-gray p-8">
            <p className="text-slate-600">
                Décrivez précisément l'actif recherché (catégorie, localisation, période, caractéristiques) via notre
                formulaire de demande RFQ. Notre équipe mobilisera son réseau de propriétaires.
            </p>
            <Link
                href="/rfq?type=recherche_actif"
                className="mt-6 inline-block rounded-full bg-keynis-red px-6 py-3 text-sm font-bold text-white hover:bg-keynis-red-dark"
            >
                Rechercher un actif
            </Link>
        </div>
    );
}

function ProposeAssetForm({ categories }) {
    const [step, setStep] = useState(0);
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        category_id: '',
        owner_name: '',
        owner_company: '',
        owner_phone: '',
        owner_whatsapp: '',
        owner_email: '',
        name: '',
        brand: '',
        model: '',
        year: '',
        capacity: '',
        location: '',
        availability: '',
        indicative_price: '',
        description: '',
        image: null,
    });

    function submit(e) {
        e.preventDefault();
        if (step < proposeSteps.length - 1) {
            if (!isStepValid(data, proposeSteps[step].required)) return;
            setStep((s) => s + 1);
            return;
        }
        post('/actifs', { preserveScroll: true, forceFormData: true });
    }

    return (
        <form onSubmit={submit} className="mt-8 max-w-2xl space-y-4">
            {recentlySuccessful && (
                <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    Votre actif a bien été soumis. Notre équipe le validera avant publication.
                </p>
            )}

            <StepIndicator steps={proposeSteps.map((s) => s.title)} current={step} />

            {step === 0 && (
                <>
                    <ImageField value={data.image} onChange={(file) => setData('image', file)} error={errors.image} />

                    <Field label="Catégorie" error={errors.category_id}>
                        <select value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} className="input">
                            <option value="">Sélectionner...</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Nom de l'actif" error={errors.name}>
                        <input value={data.name} onChange={(e) => setData('name', e.target.value)} className="input" />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Marque" error={errors.brand}>
                            <input value={data.brand} onChange={(e) => setData('brand', e.target.value)} className="input" />
                        </Field>
                        <Field label="Modèle" error={errors.model}>
                            <input value={data.model} onChange={(e) => setData('model', e.target.value)} className="input" />
                        </Field>
                        <Field label="Année" error={errors.year}>
                            <input value={data.year} onChange={(e) => setData('year', e.target.value)} className="input" />
                        </Field>
                        <Field label="Capacité" error={errors.capacity}>
                            <input value={data.capacity} onChange={(e) => setData('capacity', e.target.value)} className="input" />
                        </Field>
                    </div>
                </>
            )}

            {step === 1 && (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Localisation" error={errors.location}>
                            <input value={data.location} onChange={(e) => setData('location', e.target.value)} className="input" />
                        </Field>
                        <Field label="Prix indicatif" error={errors.indicative_price}>
                            <input value={data.indicative_price} onChange={(e) => setData('indicative_price', e.target.value)} className="input" />
                        </Field>
                    </div>

                    <Field label="Description" error={errors.description}>
                        <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="input" rows={3} />
                    </Field>
                </>
            )}

            {step === 2 && (
                <>
                    <h3 className="pt-2 text-sm font-bold uppercase tracking-wide text-keynis-navy">Coordonnées du propriétaire</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Nom" error={errors.owner_name}>
                            <input value={data.owner_name} onChange={(e) => setData('owner_name', e.target.value)} className="input" />
                        </Field>
                        <Field label="Entreprise" error={errors.owner_company}>
                            <input value={data.owner_company} onChange={(e) => setData('owner_company', e.target.value)} className="input" />
                        </Field>
                        <Field label="Téléphone" error={errors.owner_phone}>
                            <input value={data.owner_phone} onChange={(e) => setData('owner_phone', e.target.value)} className="input" />
                        </Field>
                        <Field label="WhatsApp" error={errors.owner_whatsapp}>
                            <input value={data.owner_whatsapp} onChange={(e) => setData('owner_whatsapp', e.target.value)} className="input" />
                        </Field>
                        <Field label="E-mail" error={errors.owner_email}>
                            <input value={data.owner_email} onChange={(e) => setData('owner_email', e.target.value)} className="input" />
                        </Field>
                    </div>
                </>
            )}

            <StepNav
                step={step}
                isLast={step === proposeSteps.length - 1}
                onBack={() => setStep((s) => s - 1)}
                processing={processing}
                submitLabel="Proposer cet actif"
                nextDisabled={!isStepValid(data, proposeSteps[step].required)}
            />
        </form>
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
