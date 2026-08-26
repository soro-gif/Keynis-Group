import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/Admin/StatusBadge';
import TrendLine from '@/Components/Admin/Charts/TrendLine';
import BarList from '@/Components/Admin/Charts/BarList';
import CategoryBreakdown from '@/Components/Admin/Charts/CategoryBreakdown';

const statusLabels = {
    nouvelle: 'Nouvelle',
    en_analyse: 'En analyse',
    sourcing: 'Sourcing',
    offre_disponible: 'Offre disponible',
    negociation: 'Négociation',
    validee: 'Validée',
    livraison: 'Livraison',
    cloturee: 'Clôturée',
    annulee: 'Annulée',
    rejetee: 'Rejetée',
    en_attente: 'En attente',
};

const categoryLabels = {
    demande: 'Demande',
    offre: 'Offre',
    partenariat: 'Partenariat',
};

export default function AdminDashboard({ stats, recentRfqs, rfqsTrend, rfqsByStatus, rfqsByCategory, topSubjects }) {
    const cards = [
        { label: 'Nouvelles RFQ', value: stats.rfqs_new, href: '/admin/rfqs?status=nouvelle' },
        { label: 'RFQ au total', value: stats.rfqs_total, href: '/admin/rfqs' },
        { label: 'Actifs en attente', value: stats.assets_pending, href: '/admin/actifs?status=en_attente' },
        { label: 'Actifs publiés', value: stats.assets_published, href: '/admin/actifs?status=publie' },
        { label: 'Partenaires en attente', value: stats.partners_pending, href: '/admin/partenaires?status=nouveau' },
        { label: 'Partenaires validés', value: stats.partners_validated, href: '/admin/partenaires?status=valide' },
        { label: 'Nouveaux messages', value: stats.contacts_new, href: '/admin/messages?status=nouveau' },
        { label: 'Produits au catalogue', value: stats.products_total, href: '/admin/produits' },
    ];

    const statusItems = rfqsByStatus.map((s) => ({ key: s.status, label: statusLabels[s.status] ?? s.status, count: s.count }));
    const categoryItems = rfqsByCategory.map((c) => ({ label: categoryLabels[c.category] ?? c.category, count: c.count }));
    const subjectItems = topSubjects.map((s) => ({ key: s.subject, label: s.subject, count: s.count }));

    return (
        <AdminLayout title="Tableau de bord">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((c) => (
                    <Link key={c.label} href={c.href} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-keynis-red hover:shadow-md">
                        <p className="text-3xl font-extrabold text-keynis-navy">{c.value}</p>
                        <p className="mt-1 text-sm text-slate-500">{c.label}</p>
                    </Link>
                ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <TrendLine data={rfqsTrend} />
                </div>
                <CategoryBreakdown title="Demandes par catégorie" items={categoryItems} />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <BarList
                    title="Demandes par statut"
                    subtitle="Toutes les RFQ, tous statuts confondus"
                    items={statusItems}
                />
                <BarList
                    title="Produits les plus demandés"
                    subtitle="D'après l'objet des demandes RFQ"
                    items={subjectItems}
                    emptyMessage="Aucune demande avec un objet renseigné pour le moment."
                />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 p-5">
                    <h2 className="font-bold text-keynis-navy">Dernières demandes RFQ</h2>
                    <Link href="/admin/rfqs" className="text-sm font-semibold text-keynis-red hover:underline">Voir tout →</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-xs uppercase text-slate-400">
                            <tr>
                                <th className="px-5 py-3">Référence</th>
                                <th className="px-5 py-3">Type</th>
                                <th className="px-5 py-3">Demandeur</th>
                                <th className="px-5 py-3">Objet</th>
                                <th className="px-5 py-3">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recentRfqs.map((rfq) => (
                                <tr key={rfq.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-3">
                                        <Link href={`/admin/rfqs/${rfq.id}`} className="font-semibold text-keynis-navy hover:text-keynis-red">
                                            {rfq.reference}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-3 text-slate-600">{rfq.type.replace(/_/g, ' ')}</td>
                                    <td className="px-5 py-3 text-slate-600">{rfq.name}</td>
                                    <td className="px-5 py-3 text-slate-600">{rfq.subject}</td>
                                    <td className="px-5 py-3"><StatusBadge status={rfq.status} /></td>
                                </tr>
                            ))}
                            {recentRfqs.length === 0 && (
                                <tr><td colSpan={5} className="px-5 py-6 text-center text-slate-400">Aucune demande pour le moment.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
