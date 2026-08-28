import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';

const blocks = [
    { title: 'Transport', items: ['Routier', 'Maritime', 'Aérien', 'Groupage'] },
    { title: 'Transit', items: ['Transit', 'Douane', 'Dédouanement', 'Gestion documentaire'] },
    { title: 'Stockage', items: ['Entrepôts', 'Dépôts', 'Chambres froides', 'Stockage temporaire'] },
    { title: 'Supply Chain', items: ['Approvisionnement', 'Manutention', 'Acheminement', 'Livraison', 'Distribution'] },
];

export default function Logistics() {
    return (
        <SiteLayout
            title="Logistics & Supply Chain"
            description="Keynis mobilise son réseau de partenaires logistiques pour organiser vos flux de bout en bout : transport routier, maritime, aérien, transit, dédouanement et stockage."
        >
            <PageHero
                eyebrow="Logistics & Supply Chain"
                title="Transport, transit, stockage et supply chain"
                description="Keynis mobilise son réseau de partenaires logistiques pour organiser vos flux de bout en bout."
            />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {blocks.map((b) => (
                        <div key={b.title} className="rounded-2xl border border-slate-200 p-6">
                            <h3 className="text-lg font-bold text-keynis-navy">{b.title}</h3>
                            <ul className="mt-3 space-y-1 text-sm text-slate-600">
                                {b.items.map((i) => (
                                    <li key={i}>• {i}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <Link href="/rfq?type=demande_logistique" className="rounded-full bg-keynis-red px-6 py-3 text-sm font-bold text-white hover:bg-keynis-red-dark">
                        Demander une solution logistique
                    </Link>
                </div>
            </section>
        </SiteLayout>
    );
}
