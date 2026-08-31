import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusSelect from '@/Components/Admin/StatusSelect';
import DeleteButton from '@/Components/Admin/DeleteButton';

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

function Field({ label, value }) {
    if (!value) return null;
    return (
        <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</dt>
            <dd className="mt-0.5 text-sm text-keynis-navy">{value}</dd>
        </div>
    );
}

export default function AdminRfqShow({ rfq }) {
    return (
        <AdminLayout title={rfq.reference}>
            <Link href="/admin/rfqs" className="text-sm font-semibold text-keynis-red hover:underline print:hidden">← Toutes les demandes</Link>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 print:border-none print:p-0">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">{rfq.category} · {rfq.type.replace(/_/g, ' ')}</p>
                    <h2 className="mt-1 text-xl font-extrabold text-keynis-navy">{rfq.reference}</h2>
                    {rfq.confirmed_at && (
                        <p className="mt-1 text-xs font-semibold text-green-700">
                            ✓ Confirmé par le client le {new Date(rfq.confirmed_at).toLocaleString('fr-FR')}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-3 print:hidden">
                    <StatusSelect status={rfq.status} options={statusOptions} patchUrl={`/admin/rfqs/${rfq.id}`} />
                    <Link href={`/admin/rfqs/${rfq.id}/edit`} className="rounded-full bg-keynis-navy px-4 py-2 text-sm font-bold text-white hover:bg-keynis-navy-light">
                        Modifier
                    </Link>
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-keynis-navy hover:bg-slate-50"
                    >
                        Imprimer
                    </button>
                    <DeleteButton
                        url={`/admin/rfqs/${rfq.id}`}
                        confirmMessage="Supprimer cette demande ? Cette action est irréversible."
                        className="rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50"
                    />
                </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 print:border-none print:p-0">
                    <h3 className="mb-4 font-bold text-keynis-navy">Contact</h3>
                    <dl className="space-y-3">
                        <Field label="Nom" value={rfq.name} />
                        <Field label="Entreprise" value={rfq.company} />
                        <Field label="Téléphone" value={rfq.phone} />
                        <Field label="WhatsApp" value={rfq.whatsapp} />
                        <Field label="E-mail" value={rfq.email} />
                        <Field label="Pays" value={rfq.country} />
                        <Field label="Ville" value={rfq.city} />
                    </dl>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 print:border-none print:p-0">
                    <h3 className="mb-4 font-bold text-keynis-navy">Détails de la demande</h3>
                    <dl className="space-y-3">
                        <Field label="Objet" value={rfq.subject} />
                        <Field label="Quantité" value={rfq.quantity} />
                        <Field label="Budget" value={rfq.budget} />
                        <Field label="Délai souhaité" value={rfq.deadline} />
                        <Field label="Lieu de livraison" value={rfq.delivery_location} />
                        <Field label="Reçue le" value={new Date(rfq.created_at).toLocaleString('fr-FR')} />
                    </dl>
                </div>

                {rfq.description && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2 print:border-none print:p-0">
                        <h3 className="mb-2 font-bold text-keynis-navy">Description / commentaire</h3>
                        <p className="whitespace-pre-line text-sm text-slate-600">{rfq.description}</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
