import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Form/Field';

export default function AdminProductCategoryForm({ category, parents }) {
    const isEdit = !!category;

    const { data, setData, post, put, processing, errors } = useForm({
        parent_id: category?.parent_id ?? '',
        name: category?.name ?? '',
        sector: category?.sector ?? '',
        icon: category?.icon ?? '',
        description: category?.description ?? '',
        order: category?.order ?? 0,
    });

    function submit(e) {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/categories-produits/${category.id}`);
        } else {
            post('/admin/categories-produits');
        }
    }

    return (
        <AdminLayout title={isEdit ? `Modifier · ${category.name}` : 'Nouvelle catégorie'}>
            <form onSubmit={submit} className="max-w-2xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Nom" error={errors.name}>
                        <input value={data.name} onChange={(e) => setData('name', e.target.value)} className="input" />
                    </Field>
                    <Field label="Catégorie parente" error={errors.parent_id}>
                        <select value={data.parent_id} onChange={(e) => setData('parent_id', e.target.value)} className="input">
                            <option value="">Aucune</option>
                            {parents.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Secteur" error={errors.sector}>
                        <input value={data.sector} onChange={(e) => setData('sector', e.target.value)} className="input" placeholder="ex. agriculture, btp, industrie" />
                    </Field>
                    <Field label="Icône" error={errors.icon}>
                        <input value={data.icon} onChange={(e) => setData('icon', e.target.value)} className="input" placeholder="ex. leaf, factory, cog" />
                    </Field>
                    <Field label="Ordre d'affichage" error={errors.order}>
                        <input type="number" min="0" value={data.order} onChange={(e) => setData('order', e.target.value)} className="input" />
                    </Field>
                </div>

                <Field label="Description" error={errors.description}>
                    <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="input" rows={4} />
                </Field>

                <button disabled={processing} className="rounded-full bg-keynis-red px-6 py-3 text-sm font-bold text-white hover:bg-keynis-red-dark disabled:opacity-50">
                    {isEdit ? 'Enregistrer les modifications' : 'Créer la catégorie'}
                </button>
            </form>
        </AdminLayout>
    );
}
