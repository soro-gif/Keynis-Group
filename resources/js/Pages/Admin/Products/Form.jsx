import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Form/Field';
import ImageField from '@/Components/Form/ImageField';

export default function AdminProductForm({ product, categories }) {
    const isEdit = !!product;

    const { data, setData, post, transform, processing, errors } = useForm({
        category_id: product?.category_id ?? '',
        type: product?.type ?? 'produit',
        name: product?.name ?? '',
        reference: product?.reference ?? '',
        brand: product?.brand ?? '',
        description: product?.description ?? '',
        origin: product?.origin ?? '',
        conditioning: product?.conditioning ?? '',
        min_quantity: product?.min_quantity ?? '',
        quantity_available: product?.quantity_available ?? '',
        location: product?.location ?? '',
        price_mode: product?.price_mode ?? 'sur_demande',
        price: product?.price ?? '',
        status: product?.status ?? 'disponible',
        is_featured: product?.is_featured ?? false,
        image: null,
    });

    function submit(e) {
        e.preventDefault();
        // Laravel can't parse multipart/form-data on PUT, so edits are
        // sent as POST with a spoofed _method field (Inertia + file uploads).
        if (isEdit) {
            transform((data) => ({ ...data, _method: 'put' }));
            post(`/admin/produits/${product.id}`, { forceFormData: true });
        } else {
            post('/admin/produits', { forceFormData: true });
        }
    }

    return (
        <AdminLayout title={isEdit ? `Modifier · ${product.name}` : 'Nouveau produit'}>
            <form onSubmit={submit} className="max-w-3xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
                <ImageField
                    existingImages={product?.images}
                    value={data.image}
                    onChange={(file) => setData('image', file)}
                    error={errors.image}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Field label="Nom" error={errors.name}>
                        <input value={data.name} onChange={(e) => setData('name', e.target.value)} className="input" />
                    </Field>
                    <Field label="Type" error={errors.type}>
                        <select value={data.type} onChange={(e) => setData('type', e.target.value)} className="input">
                            <option value="produit">Produit</option>
                            <option value="commodity">Commodity</option>
                        </select>
                    </Field>
                    <Field label="Catégorie" error={errors.category_id}>
                        <select value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} className="input">
                            <option value="">Aucune</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Référence" error={errors.reference}>
                        <input value={data.reference} onChange={(e) => setData('reference', e.target.value)} className="input" />
                    </Field>
                    <Field label="Marque" error={errors.brand}>
                        <input value={data.brand} onChange={(e) => setData('brand', e.target.value)} className="input" />
                    </Field>
                    <Field label="Origine" error={errors.origin}>
                        <input value={data.origin} onChange={(e) => setData('origin', e.target.value)} className="input" />
                    </Field>
                    <Field label="Conditionnement" error={errors.conditioning}>
                        <input value={data.conditioning} onChange={(e) => setData('conditioning', e.target.value)} className="input" />
                    </Field>
                    <Field label="Localisation" error={errors.location}>
                        <input value={data.location} onChange={(e) => setData('location', e.target.value)} className="input" />
                    </Field>
                    <Field label="Quantité minimale" error={errors.min_quantity}>
                        <input value={data.min_quantity} onChange={(e) => setData('min_quantity', e.target.value)} className="input" />
                    </Field>
                    <Field label="Quantité disponible" error={errors.quantity_available}>
                        <input value={data.quantity_available} onChange={(e) => setData('quantity_available', e.target.value)} className="input" />
                    </Field>
                </div>

                <Field label="Description" error={errors.description}>
                    <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="input" rows={4} />
                </Field>

                <div className="grid grid-cols-3 gap-4">
                    <Field label="Mode de prix" error={errors.price_mode}>
                        <select value={data.price_mode} onChange={(e) => setData('price_mode', e.target.value)} className="input">
                            <option value="sur_demande">Sur demande</option>
                            <option value="affiche">Affiché</option>
                            <option value="masque">Masqué</option>
                        </select>
                    </Field>
                    <Field label="Prix (FCFA)" error={errors.price}>
                        <input type="number" step="0.01" value={data.price} onChange={(e) => setData('price', e.target.value)} className="input" />
                    </Field>
                    <Field label="Statut" error={errors.status}>
                        <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="input">
                            <option value="disponible">Disponible</option>
                            <option value="indisponible">Indisponible</option>
                            <option value="sur_demande">Sur demande</option>
                        </select>
                    </Field>
                </div>

                <label className="flex items-center gap-2 text-sm font-semibold text-keynis-navy">
                    <input type="checkbox" checked={data.is_featured} onChange={(e) => setData('is_featured', e.target.checked)} />
                    Mettre en avant sur la page d'accueil
                </label>

                <button disabled={processing} className="rounded-full bg-keynis-red px-6 py-3 text-sm font-bold text-white hover:bg-keynis-red-dark disabled:opacity-50">
                    {isEdit ? 'Enregistrer les modifications' : 'Créer le produit'}
                </button>
            </form>
        </AdminLayout>
    );
}
