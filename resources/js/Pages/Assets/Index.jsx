import { useEffect, useMemo, useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import Reveal from '@/Components/Motion/Reveal';
import ImageField from '@/Components/Form/ImageField';
import StepIndicator from '@/Components/Form/StepIndicator';
import StepNav from '@/Components/Form/StepNav';
import { isStepValid } from '@/utils/steps';
import { firstImage } from '@/utils/media';

const vehicleCategories = ['Berline de prestige', 'Toyota 4x4', 'Pick Up', 'Autre'];
const availableDaysOptions = ['Lundi–Vendredi', 'Week-end', 'Tous les jours'];
const scheduleOptions = ['Journée', 'Nuit', '24h/24 selon mission'];
const serviceZoneOptions = ['Abidjan', 'Intérieur', 'National', 'Sous-région'];
const durationTypeOptions = ['Ponctuelle', 'Journalière', 'Hebdomadaire', 'Longue durée'];
const withDriverOptions = ['Oui', 'Non', 'Selon mission'];
const documentOptions = [
    'Copie de la carte grise',
    "Copie de l'assurance en cours de validité",
    "Pièce d'identité du propriétaire / représentant",
    'Photos récentes du véhicule (extérieur + intérieur)',
    'Tout document complémentaire utile à la mission',
];

const families = [
    { value: 'vehicules', label: 'Véhicules' },
    { value: 'engins_btp', label: 'Engins BTP' },
    { value: 'machines_agricoles', label: 'Machines agricoles' },
    { value: 'equipements', label: 'Équipements' },
    { value: 'infrastructures', label: 'Infrastructures' },
];

export default function AssetsIndex({ assets, categories, filters }) {
    const initialParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const requestedTab = initialParams?.get('tab');
    const requestedFamily = initialParams?.get('family');
    const [tab, setTab] = useState(['parcourir', 'recherche', 'propose'].includes(requestedTab) ? requestedTab : 'parcourir');

    return (
        <SiteLayout
            title="Location & Mobilisation d'actifs"
            description="Keynis connecte propriétaires d'actifs et entreprises ayant des besoins de mobilisation : véhicules, engins BTP, machines agricoles et infrastructures."
        >
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
                {tab === 'recherche' && <SearchAssetForm categories={categories} initialFamily={requestedFamily} />}
                {tab === 'propose' && <ProposeAssetForm categories={categories} initialFamily={requestedFamily} />}
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

function SearchAssetForm({ initialFamily }) {
    const isVehicle = initialFamily === 'vehicules';

    return (
        <div className="mt-8 max-w-2xl rounded-2xl bg-keynis-gray p-8">
            <p className="text-slate-600">
                {isVehicle
                    ? "Décrivez précisément le véhicule recherché (catégorie, période, zone d'intervention, avec ou sans chauffeur) via notre formulaire de demande RFQ. Notre équipe mobilisera son réseau de propriétaires de véhicules."
                    : "Décrivez précisément l'actif recherché (catégorie, localisation, période, caractéristiques) via notre formulaire de demande RFQ. Notre équipe mobilisera son réseau de propriétaires."}
            </p>
            <Link
                href={isVehicle ? '/rfq?type=recherche_actif&subject=V%C3%A9hicule' : '/rfq?type=recherche_actif'}
                className="mt-6 inline-block rounded-full bg-keynis-red px-6 py-3 text-sm font-bold text-white hover:bg-keynis-red-dark"
            >
                {isVehicle ? 'Demander un véhicule' : 'Rechercher un actif'}
            </Link>
        </div>
    );
}

function ProposeAssetForm({ categories, initialFamily }) {
    const [step, setStep] = useState(0);
    const preselectedCategory = initialFamily ? categories.find((c) => c.family === initialFamily) : null;
    const { data, setData, post, transform, processing, errors } = useForm({
        category_id: preselectedCategory ? String(preselectedCategory.id) : '',
        owner_name: '',
        owner_type: '',
        owner_company: '',
        owner_phone: '',
        owner_whatsapp: '',
        owner_email: '',
        id_number: '',
        address: '',
        city: '',
        contact_person: '',
        contact_role: '',
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
        vehicle_category: '',
        vehicle_category_other: '',
        registration: '',
        color: '',
        mileage: '',
        condition: '',
        transmission: '',
        engine: '',
        air_conditioning: '',
        equipment: '',
        intervention_zone: '',
        driver_available: '',
        available_days: [],
        schedule: [],
        service_zone: [],
        duration_type: [],
        with_driver: '',
        price_per_day: '',
        price_per_mission: '',
        documents_provided: [],
        agreement: false,
    });

    const isVehicle = categories.find((c) => String(c.id) === String(data.category_id))?.family === 'vehicules';

    const proposeSteps = useMemo(() => {
        const s = [
            {
                title: 'Propriétaire',
                required: ['owner_name', 'owner_type', 'owner_phone', 'owner_email', 'address', 'city'],
                fields: ['owner_name', 'owner_type', 'owner_company', 'owner_phone', 'owner_whatsapp', 'owner_email', 'id_number', 'address', 'city', 'contact_person', 'contact_role'],
            },
            {
                title: 'Actif',
                required: ['category_id', 'name'],
                fields: isVehicle ? ['image', 'category_id', 'name'] : ['image', 'category_id', 'name', 'brand', 'model', 'year', 'capacity'],
            },
        ];
        if (isVehicle) {
            s.push({
                title: 'Véhicule',
                required: ['brand', 'model', 'year', 'registration', 'color', 'condition', 'availability', 'intervention_zone'],
                fields: ['vehicle_category', 'vehicle_category_other', 'brand', 'model', 'year', 'registration', 'color', 'capacity', 'mileage', 'condition', 'transmission', 'engine', 'air_conditioning', 'equipment', 'availability', 'intervention_zone', 'driver_available', 'description'],
            });
            s.push({ title: 'Disponibilité', required: [], fields: ['available_days', 'schedule', 'service_zone', 'duration_type', 'with_driver', 'price_per_day', 'price_per_mission'] });
            s.push({ title: 'Documents', required: [], fields: ['documents_provided'] });
        } else {
            s.push({ title: 'Détails', required: [], fields: ['location', 'indicative_price', 'description'] });
        }
        s.push({ title: 'Engagement', required: [], fields: ['agreement'] });
        return s;
    }, [isVehicle]);

    useEffect(() => {
        setStep((s) => Math.min(s, proposeSteps.length - 1));
    }, [proposeSteps.length]);

    useEffect(() => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length === 0) return;
        const idx = proposeSteps.findIndex((s) => s.fields.some((f) => errorKeys.includes(f)));
        if (idx !== -1) setStep(idx);
    }, [errors, proposeSteps]);

    function toggleValue(field, value) {
        const current = data[field];
        setData(field, current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
    }

    function submit(e) {
        e.preventDefault();
        const isLast = step === proposeSteps.length - 1;
        if (!isLast) {
            if (!isStepValid(data, proposeSteps[step].required)) return;
            setStep((s) => s + 1);
            return;
        }
        if (!data.agreement) return;
        transform((d) => ({
            ...d,
            vehicle_category: d.vehicle_category === 'Autre' && d.vehicle_category_other ? d.vehicle_category_other : d.vehicle_category,
        }));
        post('/actifs', { preserveScroll: true, forceFormData: true });
    }

    const stepTitle = proposeSteps[step].title;

    return (
        <form onSubmit={submit} className="mt-8 max-w-2xl space-y-4">

            <StepIndicator steps={proposeSteps.map((s) => s.title)} current={step} />

            {stepTitle === 'Propriétaire' && (
                <>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-keynis-navy">Informations sur le propriétaire</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Nom & Prénoms / Raison sociale" required error={errors.owner_name}>
                            <input
                                value={data.owner_name}
                                onChange={(e) => setData('owner_name', e.target.value)}
                                placeholder="Ex : Koffi Jean-Baptiste"
                                required
                                className="input"
                            />
                        </Field>
                        <Field label="Type de propriétaire" required error={errors.owner_type}>
                            <select value={data.owner_type} onChange={(e) => setData('owner_type', e.target.value)} required className="input">
                                <option value="">Sélectionner...</option>
                                <option value="particulier">Particulier</option>
                                <option value="entreprise">Entreprise</option>
                                <option value="autre">Autre</option>
                            </select>
                        </Field>
                        <Field label="Téléphone" required error={errors.owner_phone}>
                            <input
                                value={data.owner_phone}
                                onChange={(e) => setData('owner_phone', e.target.value)}
                                placeholder="Ex : 07 15 25 89 89"
                                required
                                className="input"
                            />
                        </Field>
                        <Field label="WhatsApp" error={errors.owner_whatsapp}>
                            <input
                                value={data.owner_whatsapp}
                                onChange={(e) => setData('owner_whatsapp', e.target.value)}
                                placeholder="Si différent du téléphone"
                                className="input"
                            />
                        </Field>
                        <Field label="E-mail" required error={errors.owner_email}>
                            <input
                                type="email"
                                value={data.owner_email}
                                onChange={(e) => setData('owner_email', e.target.value)}
                                placeholder="Ex : nom@email.com"
                                required
                                className="input"
                            />
                        </Field>
                        <Field label="N° CNI / RCCM / CNPS / Autre" error={errors.id_number}>
                            <input
                                value={data.id_number}
                                onChange={(e) => setData('id_number', e.target.value)}
                                placeholder="Numéro de la pièce"
                                className="input"
                            />
                        </Field>
                        <Field label="Entreprise (si applicable)" error={errors.owner_company}>
                            <input
                                value={data.owner_company}
                                onChange={(e) => setData('owner_company', e.target.value)}
                                placeholder="Nom de l'entreprise"
                                className="input"
                            />
                        </Field>
                        <Field label="Adresse" required error={errors.address}>
                            <input
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Ex : Cocody, Rue des Jardins"
                                required
                                className="input"
                            />
                        </Field>
                        <Field label="Ville / Commune" required error={errors.city}>
                            <input
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                placeholder="Ex : Abidjan"
                                required
                                className="input"
                            />
                        </Field>
                        <Field label="Personne à contacter" error={errors.contact_person}>
                            <input
                                value={data.contact_person}
                                onChange={(e) => setData('contact_person', e.target.value)}
                                placeholder="Si différente du propriétaire"
                                className="input"
                            />
                        </Field>
                        <Field label="Fonction / Qualité" error={errors.contact_role}>
                            <input
                                value={data.contact_role}
                                onChange={(e) => setData('contact_role', e.target.value)}
                                placeholder="Ex : Gérant, Représentant"
                                className="input"
                            />
                        </Field>
                    </div>
                </>
            )}

            {stepTitle === 'Actif' && (
                <>
                    <ImageField value={data.image} onChange={(file) => setData('image', file)} error={errors.image} />

                    <Field label="Catégorie" required error={errors.category_id}>
                        <select value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} required className="input">
                            <option value="">Sélectionner...</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Nom de l'actif" required error={errors.name}>
                        <input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Ex : Camion benne 10T"
                            required
                            className="input"
                        />
                    </Field>

                    {!isVehicle && (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field label="Marque" error={errors.brand}>
                                <input value={data.brand} onChange={(e) => setData('brand', e.target.value)} placeholder="Ex : Caterpillar" className="input" />
                            </Field>
                            <Field label="Modèle" error={errors.model}>
                                <input value={data.model} onChange={(e) => setData('model', e.target.value)} placeholder="Ex : 320D" className="input" />
                            </Field>
                            <Field label="Année" error={errors.year}>
                                <input value={data.year} onChange={(e) => setData('year', e.target.value)} placeholder="Ex : 2020" className="input" />
                            </Field>
                            <Field label="Capacité" error={errors.capacity}>
                                <input value={data.capacity} onChange={(e) => setData('capacity', e.target.value)} placeholder="Ex : 10 tonnes" className="input" />
                            </Field>
                        </div>
                    )}
                </>
            )}

            {stepTitle === 'Véhicule' && (
                <>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-keynis-navy">Informations sur le véhicule</h3>

                    <Field label="Catégorie recherchée">
                        <PillSelect options={vehicleCategories} value={data.vehicle_category} onChange={(v) => setData('vehicle_category', v)} />
                        {data.vehicle_category === 'Autre' && (
                            <input
                                value={data.vehicle_category_other}
                                placeholder="Précisez la catégorie"
                                onChange={(e) => setData('vehicle_category_other', e.target.value)}
                                className="input mt-2"
                            />
                        )}
                    </Field>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Marque" required error={errors.brand}>
                            <input value={data.brand} onChange={(e) => setData('brand', e.target.value)} placeholder="Ex : Toyota" required className="input" />
                        </Field>
                        <Field label="Modèle" required error={errors.model}>
                            <input value={data.model} onChange={(e) => setData('model', e.target.value)} placeholder="Ex : Land Cruiser Prado" required className="input" />
                        </Field>
                        <Field label="Année" required error={errors.year}>
                            <input value={data.year} onChange={(e) => setData('year', e.target.value)} placeholder="Ex : 2021" required className="input" />
                        </Field>
                        <Field label="Immatriculation" required error={errors.registration}>
                            <input value={data.registration} onChange={(e) => setData('registration', e.target.value)} placeholder="Ex : CI 1234 AB 01" required className="input" />
                        </Field>
                        <Field label="Couleur" required error={errors.color}>
                            <input value={data.color} onChange={(e) => setData('color', e.target.value)} placeholder="Ex : Gris métallisé" required className="input" />
                        </Field>
                        <Field label="Nombre de places" error={errors.capacity}>
                            <input value={data.capacity} onChange={(e) => setData('capacity', e.target.value)} placeholder="Ex : 5" className="input" />
                        </Field>
                        <Field label="Kilométrage" error={errors.mileage}>
                            <input value={data.mileage} onChange={(e) => setData('mileage', e.target.value)} placeholder="Ex : 45 000 km" className="input" />
                        </Field>
                        <Field label="État général" required error={errors.condition}>
                            <input value={data.condition} onChange={(e) => setData('condition', e.target.value)} placeholder="Ex : Très bon état" required className="input" />
                        </Field>
                        <Field label="Transmission" error={errors.transmission}>
                            <input value={data.transmission} onChange={(e) => setData('transmission', e.target.value)} placeholder="Ex : Automatique" className="input" />
                        </Field>
                        <Field label="Motorisation" error={errors.engine}>
                            <input value={data.engine} onChange={(e) => setData('engine', e.target.value)} placeholder="Ex : Diesel 3.0L" className="input" />
                        </Field>
                        <Field label="Climatisation" error={errors.air_conditioning}>
                            <input value={data.air_conditioning} onChange={(e) => setData('air_conditioning', e.target.value)} placeholder="Ex : Oui" className="input" />
                        </Field>
                        <Field label="GPS / Équipements" error={errors.equipment}>
                            <input value={data.equipment} onChange={(e) => setData('equipment', e.target.value)} placeholder="Ex : GPS, caméra de recul" className="input" />
                        </Field>
                        <Field label="Disponibilité" required error={errors.availability}>
                            <input value={data.availability} onChange={(e) => setData('availability', e.target.value)} placeholder="Ex : Immédiate" required className="input" />
                        </Field>
                        <Field label="Zone d'intervention" required error={errors.intervention_zone}>
                            <input value={data.intervention_zone} onChange={(e) => setData('intervention_zone', e.target.value)} placeholder="Ex : Abidjan et intérieur du pays" required className="input" />
                        </Field>
                        <Field label="Conducteur disponible ?" error={errors.driver_available}>
                            <input value={data.driver_available} onChange={(e) => setData('driver_available', e.target.value)} placeholder="Ex : Oui, sur demande" className="input" />
                        </Field>
                    </div>

                    <Field label="Observations / caractéristiques particulières" error={errors.description}>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Toute information utile sur le véhicule..."
                            className="input"
                            rows={3}
                        />
                    </Field>
                </>
            )}

            {stepTitle === 'Détails' && (
                <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Localisation" error={errors.location}>
                            <input value={data.location} onChange={(e) => setData('location', e.target.value)} placeholder="Ex : Abidjan, Yopougon" className="input" />
                        </Field>
                        <Field label="Prix indicatif" error={errors.indicative_price}>
                            <input value={data.indicative_price} onChange={(e) => setData('indicative_price', e.target.value)} placeholder="Ex : 150 000 FCFA / jour" className="input" />
                        </Field>
                    </div>

                    <Field label="Description" error={errors.description}>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Décrivez l'actif et ses conditions d'utilisation..."
                            className="input"
                            rows={3}
                        />
                    </Field>
                </>
            )}

            {stepTitle === 'Disponibilité' && (
                <>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-keynis-navy">Disponibilité et conditions de partenariat</h3>

                    <Field label="Jours disponibles">
                        <PillMultiSelect options={availableDaysOptions} value={data.available_days} onToggle={(v) => toggleValue('available_days', v)} />
                    </Field>
                    <Field label="Horaires">
                        <PillMultiSelect options={scheduleOptions} value={data.schedule} onToggle={(v) => toggleValue('schedule', v)} />
                    </Field>
                    <Field label="Zone de service">
                        <PillMultiSelect options={serviceZoneOptions} value={data.service_zone} onToggle={(v) => toggleValue('service_zone', v)} />
                    </Field>
                    <Field label="Durée de mise à disposition">
                        <PillMultiSelect options={durationTypeOptions} value={data.duration_type} onToggle={(v) => toggleValue('duration_type', v)} />
                    </Field>
                    <Field label="Avec chauffeur">
                        <PillSelect options={withDriverOptions} value={data.with_driver} onChange={(v) => setData('with_driver', v)} />
                    </Field>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Montant / jour (FCFA)" error={errors.price_per_day}>
                            <input value={data.price_per_day} onChange={(e) => setData('price_per_day', e.target.value)} placeholder="Ex : 75 000" className="input" />
                        </Field>
                        <Field label="Montant / mission (FCFA)" error={errors.price_per_mission}>
                            <input value={data.price_per_mission} onChange={(e) => setData('price_per_mission', e.target.value)} placeholder="Ex : 250 000" className="input" />
                        </Field>
                    </div>
                </>
            )}

            {stepTitle === 'Documents' && (
                <>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-keynis-navy">Documents à fournir</h3>
                    <p className="text-sm text-slate-500">Cochez les documents que vous pourrez transmettre à notre équipe.</p>
                    <div className="space-y-2">
                        {documentOptions.map((doc) => (
                            <label key={doc} className="flex items-start gap-2 text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={data.documents_provided.includes(doc)}
                                    onChange={() => toggleValue('documents_provided', doc)}
                                    className="mt-1"
                                />
                                {doc}
                            </label>
                        ))}
                    </div>
                </>
            )}

            {stepTitle === 'Engagement' && (
                <>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-keynis-navy">Engagement et déclaration</h3>
                    <p className="text-sm text-slate-600">
                        Je soussigné(e), certifie l'exactitude des informations fournies et déclare être habilité(e) à proposer
                        cet actif au référencement. J'autorise KEYNIS TRADING & LOGISTICS GROUP à examiner ma demande et à me
                        contacter dans le cadre de propositions de missions ou de partenariats.
                    </p>
                    <label className="flex items-start gap-2 text-sm font-semibold text-keynis-navy">
                        <input
                            type="checkbox"
                            checked={data.agreement}
                            onChange={(e) => setData('agreement', e.target.checked)}
                            required
                            className="mt-1"
                        />
                        J'accepte les conditions de référencement et la politique de confidentialité de KEYNIS GROUP.
                    </label>
                    {errors.agreement && <span className="block text-xs text-keynis-red">{errors.agreement}</span>}
                </>
            )}

            <StepNav
                step={step}
                isLast={step === proposeSteps.length - 1}
                onBack={() => setStep((s) => s - 1)}
                processing={processing}
                submitLabel="Proposer cet actif"
                nextDisabled={step === proposeSteps.length - 1 ? !data.agreement : !isStepValid(data, proposeSteps[step].required)}
            />
        </form>
    );
}

function PillSelect({ options, value, onChange }) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    onClick={() => onChange(option)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${value === option ? 'bg-keynis-navy text-white' : 'bg-keynis-gray text-slate-600'}`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

function PillMultiSelect({ options, value, onToggle }) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    onClick={() => onToggle(option)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${value.includes(option) ? 'bg-keynis-navy text-white' : 'bg-keynis-gray text-slate-600'}`}
                >
                    {option}
                </button>
            ))}
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
