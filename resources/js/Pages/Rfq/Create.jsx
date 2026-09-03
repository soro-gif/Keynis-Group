import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import Field from '@/Components/Form/Field';

const TYPE_OPTIONS = [
    { value: 'demande_produit', category: 'demande', label: 'Un produit' },
    { value: 'demande_sourcing', category: 'demande', label: 'Un sourcing' },
    { value: 'demande_commodity', category: 'demande', label: 'Une commodity' },
    { value: 'demande_logistique', category: 'demande', label: 'Un service logistique' },
    { value: 'recherche_actif', category: 'demande', label: "Un actif à louer" },
    { value: 'offre_produit', category: 'offre', label: 'Un produit' },
    { value: 'offre_stock', category: 'offre', label: 'Un stock disponible' },
    { value: 'offre_producteur', category: 'offre', label: 'En tant que producteur' },
    { value: 'offre_fabricant', category: 'offre', label: 'En tant que fabricant' },
    { value: 'offre_actif', category: 'offre', label: 'Un actif à louer' },
    { value: 'partenariat_fournisseur', category: 'partenariat', label: 'En tant que fournisseur' },
    { value: 'partenariat_producteur', category: 'partenariat', label: 'En tant que producteur' },
    { value: 'partenariat_logistique', category: 'partenariat', label: 'En tant qu\'acteur logistique' },
    { value: 'partenariat_distributeur', category: 'partenariat', label: 'En tant que distributeur' },
];

const CATEGORY_LABELS = {
    demande: 'Demande',
    offre: 'Offre',
    partenariat: 'Partenariat',
};

const CATEGORY_GROUPS = ['demande', 'offre', 'partenariat'];

function typeToCategory(type) {
    return TYPE_OPTIONS.find((t) => t.value === type)?.category || 'demande';
}

export default function RfqCreate({ presetType, presetSubject }) {
    const isPreset = TYPE_OPTIONS.some((t) => t.value === presetType);

    const { data, setData, post, processing, errors } = useForm({
        category: typeToCategory(isPreset ? presetType : 'demande_produit'),
        type: isPreset ? presetType : '',
        name: '',
        company: '',
        phone: '',
        whatsapp: '',
        email: '',
        country: '',
        city: '',
        subject: presetSubject || '',
        description: '',
        quantity: '',
        budget: '',
        deadline: '',
        delivery_location: '',
    });

    function handleTypeChange(value) {
        setData((prev) => ({ ...prev, type: value, category: typeToCategory(value) }));
    }

    function submit(e) {
        e.preventDefault();
        post('/rfq', { preserveScroll: true });
    }

    const categoryLabel = CATEGORY_LABELS[data.category];

    return (
        <SiteLayout
            title="Faire une demande RFQ"
            description="Envoyez votre demande, offre ou proposition de partenariat à Keynis Trading & Logistics Group."
        >
            <PageHero
                eyebrow={categoryLabel ? `RFQ · ${categoryLabel}` : 'RFQ'}
                title="Faites-nous part de votre besoin"
                description="Décrivez votre demande, notre équipe reviendra vers vous rapidement avec une réponse adaptée."
            />

            <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-8">
                    {isPreset ? (
                        <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-6">
                            <span className="rounded-full bg-keynis-red/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-keynis-red">
                                {categoryLabel}
                            </span>
                            <p className="text-sm text-slate-500">
                                {TYPE_OPTIONS.find((t) => t.value === presetType)?.label}
                            </p>
                        </div>
                    ) : (
                        <div className="mb-6 border-b border-slate-100 pb-6">
                            <Field label="Type de démarche" error={errors.type}>
                                <select
                                    value={data.type}
                                    onChange={(e) => handleTypeChange(e.target.value)}
                                    required
                                    className="input"
                                >
                                    <option value="">Sélectionner...</option>
                                    {CATEGORY_GROUPS.map((group) => (
                                        <optgroup key={group} label={CATEGORY_LABELS[group]}>
                                            {TYPE_OPTIONS.filter((t) => t.category === group).map((t) => (
                                                <option key={t.value} value={t.value}>{t.label}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </Field>
                        </div>
                    )}

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-4">
                            <h3 className="font-bold text-keynis-navy">Coordonnées</h3>
                            <Field label="Nom et prénoms *" error={errors.name}>
                                <input value={data.name} onChange={(e) => setData('name', e.target.value)} required className="input" />
                            </Field>
                            <Field label="Entreprise" error={errors.company}>
                                <input value={data.company} onChange={(e) => setData('company', e.target.value)} className="input" />
                            </Field>
                            <Field label="Téléphone *" error={errors.phone}>
                                <input value={data.phone} onChange={(e) => setData('phone', e.target.value)} required className="input" placeholder="Ex : 07 15 25 89 89" />
                            </Field>
                            <Field label="WhatsApp" error={errors.whatsapp}>
                                <input value={data.whatsapp} onChange={(e) => setData('whatsapp', e.target.value)} className="input" placeholder="Si différent du téléphone" />
                            </Field>
                            <Field label="E-mail *" error={errors.email}>
                                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required className="input" />
                            </Field>
                            <Field label="Pays" error={errors.country}>
                                <input value={data.country} onChange={(e) => setData('country', e.target.value)} className="input" />
                            </Field>
                            <Field label="Ville" error={errors.city}>
                                <input value={data.city} onChange={(e) => setData('city', e.target.value)} className="input" />
                            </Field>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-keynis-navy">Détails de la demande</h3>
                            <Field label="Produit / commodity / service concerné *" error={errors.subject}>
                                <input value={data.subject} onChange={(e) => setData('subject', e.target.value)} required className="input" />
                            </Field>
                            <Field label="Quantité" error={errors.quantity}>
                                <input value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} className="input" placeholder="Ex : 4 semaines, 20 tonnes..." />
                            </Field>
                            <Field label="Budget éventuel" error={errors.budget}>
                                <input value={data.budget} onChange={(e) => setData('budget', e.target.value)} className="input" />
                            </Field>
                            <Field label="Délai souhaité" error={errors.deadline}>
                                <input
                                    type="date"
                                    value={data.deadline}
                                    onChange={(e) => setData('deadline', e.target.value)}
                                    min={new Date().toISOString().slice(0, 10)}
                                    className="input"
                                />
                            </Field>
                            <Field label="Lieu de livraison" error={errors.delivery_location}>
                                <input value={data.delivery_location} onChange={(e) => setData('delivery_location', e.target.value)} className="input" />
                            </Field>
                        </div>
                    </div>

                    <div className="mt-6 border-t border-slate-100 pt-6">
                        <Field label="Description / commentaire" error={errors.description}>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="input"
                                placeholder="Précisez toute information utile à votre demande..."
                            />
                        </Field>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-6 w-full rounded-full bg-keynis-red px-6 py-3 text-sm font-bold text-white hover:bg-keynis-red-dark disabled:opacity-50 sm:w-auto"
                    >
                        {processing ? 'Envoi en cours…' : 'Envoyer ma demande'}
                    </button>
                </form>
            </section>
        </SiteLayout>
    );
}
