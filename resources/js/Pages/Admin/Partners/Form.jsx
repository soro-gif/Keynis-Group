import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Form/Field';
import ImageField from '@/Components/Form/ImageField';

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

export default function AdminPartnerForm({ partner }) {
    const isEdit = !!partner;

    const { data, setData, post, transform, processing, errors } = useForm({
        category: partner?.category ?? categoryOptions[0][0],
        company_name: partner?.company_name ?? '',
        contact_name: partner?.contact_name ?? '',
        country: partner?.country ?? '',
        city: partner?.city ?? '',
        phone: partner?.phone ?? '',
        whatsapp: partner?.whatsapp ?? '',
        email: partner?.email ?? '',
        website: partner?.website ?? '',
        sector: partner?.sector ?? '',
        products_services: partner?.products_services ?? '',
        capacities: partner?.capacities ?? '',
        coverage_area: partner?.coverage_area ?? '',
        message: partner?.message ?? '',
        status: partner?.status ?? 'nouveau',
        logo: null,
    });

    function submit(e) {
        e.preventDefault();
        if (isEdit) {
            // Laravel can't parse multipart/form-data on PATCH, so edits are
            // sent as POST with a spoofed _method field (file upload requirement).
            transform((data) => ({ ...data, _method: 'patch' }));
            post(`/admin/partenaires/${partner.id}`, { forceFormData: true });
        } else {
            post('/admin/partenaires', { forceFormData: true });
        }
    }

    return (
        <AdminLayout title={isEdit ? `Modifier · ${partner.company_name}` : 'Nouveau partenaire'}>
            <form onSubmit={submit} className="max-w-3xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
                <ImageField
                    label="Logo"
                    existingImages={partner?.logo ? [partner.logo] : []}
                    value={data.logo}
                    onChange={(file) => setData('logo', file)}
                    error={errors.logo}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Field label="Catégorie" error={errors.category}>
                        <select value={data.category} onChange={(e) => setData('category', e.target.value)} className="input">
                            {categoryOptions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                        </select>
                    </Field>
                    <Field label="Statut" error={errors.status}>
                        <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="input">
                            <option value="nouveau">Nouveau</option>
                            <option value="en_qualification">En qualification</option>
                            <option value="valide">Validé</option>
                            <option value="rejete">Rejeté</option>
                        </select>
                    </Field>
                    <Field label="Raison sociale" error={errors.company_name}>
                        <input value={data.company_name} onChange={(e) => setData('company_name', e.target.value)} className="input" />
                    </Field>
                    <Field label="Nom du responsable" error={errors.contact_name}>
                        <input value={data.contact_name} onChange={(e) => setData('contact_name', e.target.value)} className="input" />
                    </Field>
                    <Field label="Pays" error={errors.country}>
                        <input value={data.country} onChange={(e) => setData('country', e.target.value)} className="input" />
                    </Field>
                    <Field label="Ville" error={errors.city}>
                        <input value={data.city} onChange={(e) => setData('city', e.target.value)} className="input" />
                    </Field>
                    <Field label="Téléphone" error={errors.phone}>
                        <input value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="input" />
                    </Field>
                    <Field label="WhatsApp" error={errors.whatsapp}>
                        <input value={data.whatsapp} onChange={(e) => setData('whatsapp', e.target.value)} className="input" />
                    </Field>
                    <Field label="E-mail" error={errors.email}>
                        <input value={data.email} onChange={(e) => setData('email', e.target.value)} className="input" />
                    </Field>
                    <Field label="Site internet" error={errors.website}>
                        <input value={data.website} onChange={(e) => setData('website', e.target.value)} className="input" />
                    </Field>
                    <Field label="Secteur d'activité" error={errors.sector}>
                        <input value={data.sector} onChange={(e) => setData('sector', e.target.value)} className="input" />
                    </Field>
                    <Field label="Zone d'intervention" error={errors.coverage_area}>
                        <input value={data.coverage_area} onChange={(e) => setData('coverage_area', e.target.value)} className="input" />
                    </Field>
                </div>

                <Field label="Produits / services proposés" error={errors.products_services}>
                    <textarea value={data.products_services} onChange={(e) => setData('products_services', e.target.value)} className="input" rows={2} />
                </Field>
                <Field label="Capacités" error={errors.capacities}>
                    <textarea value={data.capacities} onChange={(e) => setData('capacities', e.target.value)} className="input" rows={2} />
                </Field>
                <Field label="Message" error={errors.message}>
                    <textarea value={data.message} onChange={(e) => setData('message', e.target.value)} className="input" rows={3} />
                </Field>

                <button disabled={processing} className="rounded-full bg-keynis-red px-6 py-3 text-sm font-bold text-white hover:bg-keynis-red-dark disabled:opacity-50">
                    {isEdit ? 'Enregistrer les modifications' : 'Créer le partenaire'}
                </button>
            </form>
        </AdminLayout>
    );
}
