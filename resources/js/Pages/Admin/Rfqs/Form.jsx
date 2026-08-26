import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Form/Field';

const statusOptions = [
    ['nouvelle', 'Nouvelle'],
    ['en_analyse', 'En analyse'],
    ['sourcing', 'Sourcing'],
    ['offre_disponible', 'Offre disponible'],
    ['negociation', 'Négociation'],
    ['validee', 'Validée'],
    ['livraison', 'Livraison'],
    ['cloturee', 'Clôturée'],
    ['annulee', 'Annulée'],
    ['rejetee', 'Rejetée'],
    ['en_attente', 'En attente'],
];

export default function AdminRfqForm({ rfq }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: rfq.name,
        company: rfq.company ?? '',
        phone: rfq.phone,
        whatsapp: rfq.whatsapp ?? '',
        email: rfq.email,
        country: rfq.country ?? '',
        city: rfq.city ?? '',
        subject: rfq.subject,
        description: rfq.description ?? '',
        quantity: rfq.quantity ?? '',
        budget: rfq.budget ?? '',
        deadline: rfq.deadline ?? '',
        delivery_location: rfq.delivery_location ?? '',
        status: rfq.status,
    });

    function submit(e) {
        e.preventDefault();
        patch(`/admin/rfqs/${rfq.id}`);
    }

    return (
        <AdminLayout title={`Modifier · ${rfq.reference}`}>
            <form onSubmit={submit} className="max-w-3xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
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
                        <input value={data.email} onChange={(e) => setData('email', e.target.value)} className="input" />
                    </Field>
                    <Field label="Pays" error={errors.country}>
                        <input value={data.country} onChange={(e) => setData('country', e.target.value)} className="input" />
                    </Field>
                    <Field label="Ville" error={errors.city}>
                        <input value={data.city} onChange={(e) => setData('city', e.target.value)} className="input" />
                    </Field>
                    <Field label="Délai souhaité" error={errors.deadline}>
                        <input type="date" value={data.deadline} onChange={(e) => setData('deadline', e.target.value)} className="input" />
                    </Field>
                    <Field label="Quantité" error={errors.quantity}>
                        <input value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} className="input" />
                    </Field>
                    <Field label="Budget" error={errors.budget}>
                        <input value={data.budget} onChange={(e) => setData('budget', e.target.value)} className="input" />
                    </Field>
                    <Field label="Lieu de livraison" error={errors.delivery_location}>
                        <input value={data.delivery_location} onChange={(e) => setData('delivery_location', e.target.value)} className="input" />
                    </Field>
                    <Field label="Statut" error={errors.status}>
                        <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="input">
                            {statusOptions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                        </select>
                    </Field>
                </div>

                <Field label="Objet" error={errors.subject}>
                    <input value={data.subject} onChange={(e) => setData('subject', e.target.value)} className="input" />
                </Field>

                <Field label="Description / commentaire" error={errors.description}>
                    <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="input" rows={4} />
                </Field>

                <button disabled={processing} className="rounded-full bg-keynis-red px-6 py-3 text-sm font-bold text-white hover:bg-keynis-red-dark disabled:opacity-50">
                    Enregistrer les modifications
                </button>
            </form>
        </AdminLayout>
    );
}
