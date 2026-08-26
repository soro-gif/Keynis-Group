import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Form/Field';
import ImageField from '@/Components/Form/ImageField';

export default function AdminAssetForm({ asset, categories }) {
    const isEdit = !!asset;

    const { data, setData, post, transform, processing, errors } = useForm({
        category_id: asset?.category_id ?? '',
        listing_type: asset?.listing_type ?? 'propose',
        name: asset?.name ?? '',
        brand: asset?.brand ?? '',
        model: asset?.model ?? '',
        year: asset?.year ?? '',
        capacity: asset?.capacity ?? '',
        location: asset?.location ?? '',
        availability: asset?.availability ?? '',
        indicative_price: asset?.indicative_price ?? '',
        description: asset?.description ?? '',
        owner_name: asset?.owner_name ?? '',
        owner_company: asset?.owner_company ?? '',
        owner_phone: asset?.owner_phone ?? '',
        owner_whatsapp: asset?.owner_whatsapp ?? '',
        owner_email: asset?.owner_email ?? '',
        status: asset?.status ?? 'publie',
        image: null,
    });

    function submit(e) {
        e.preventDefault();
        if (isEdit) {
            // Laravel can't parse multipart/form-data on PATCH, so edits are
            // sent as POST with a spoofed _method field (file upload requirement).
            transform((data) => ({ ...data, _method: 'patch' }));
            post(`/admin/actifs/${asset.id}`, { forceFormData: true });
        } else {
            post('/admin/actifs', { forceFormData: true });
        }
    }

    return (
        <AdminLayout title={isEdit ? `Modifier · ${asset.name}` : 'Nouvel actif'}>
            <form onSubmit={submit} className="max-w-3xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
                <ImageField
                    existingImages={asset?.photos}
                    value={data.image}
                    onChange={(file) => setData('image', file)}
                    error={errors.image}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Field label="Nom de l'actif" error={errors.name}>
                        <input value={data.name} onChange={(e) => setData('name', e.target.value)} className="input" />
                    </Field>
                    <Field label="Catégorie" error={errors.category_id}>
                        <select value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} className="input">
                            <option value="">Aucune</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Type d'annonce" error={errors.listing_type}>
                        <select value={data.listing_type} onChange={(e) => setData('listing_type', e.target.value)} className="input">
                            <option value="propose">Proposé (disponible à la location)</option>
                            <option value="recherche">Recherché</option>
                        </select>
                    </Field>
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
                    <Field label="Localisation" error={errors.location}>
                        <input value={data.location} onChange={(e) => setData('location', e.target.value)} className="input" />
                    </Field>
                    <Field label="Disponibilité" error={errors.availability}>
                        <input value={data.availability} onChange={(e) => setData('availability', e.target.value)} className="input" />
                    </Field>
                    <Field label="Prix indicatif" error={errors.indicative_price}>
                        <input value={data.indicative_price} onChange={(e) => setData('indicative_price', e.target.value)} className="input" />
                    </Field>
                    <Field label="Statut" error={errors.status}>
                        <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="input">
                            <option value="en_attente">En attente</option>
                            <option value="publie">Publié</option>
                            <option value="indisponible">Indisponible</option>
                        </select>
                    </Field>
                </div>

                <Field label="Description" error={errors.description}>
                    <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="input" rows={3} />
                </Field>

                <h3 className="pt-2 text-sm font-bold uppercase tracking-wide text-keynis-navy">Propriétaire</h3>
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

                <button disabled={processing} className="rounded-full bg-keynis-red px-6 py-3 text-sm font-bold text-white hover:bg-keynis-red-dark disabled:opacity-50">
                    {isEdit ? 'Enregistrer les modifications' : "Créer l'actif"}
                </button>
            </form>
        </AdminLayout>
    );
}
