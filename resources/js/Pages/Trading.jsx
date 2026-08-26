import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';

const categories = [
    'Matériaux', 'Équipements', 'Machines', 'Outillages', 'Consommables',
    'Produits professionnels', 'Produits industriels', 'Produits agricoles', 'Produits spécifiques',
];

const services = [
    'Achat-revente', 'Sourcing', 'Approvisionnement', 'Négoce B2B',
    'Importation', 'Exportation', 'Trading', 'Stockage', 'Commercialisation',
];

export default function Trading() {
    return (
        <SiteLayout title="Trading & Négoce">
            <PageHero
                eyebrow="Trading & Négoce"
                title="Sourcing, négoce et commercialisation B2B"
                description="Keynis identifie et mobilise les produits adaptés aux besoins des acheteurs, en Côte d'Ivoire comme à l'international."
            />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2">
                    <div>
                        <h2 className="text-xl font-bold text-keynis-navy">Catégories</h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {categories.map((c) => (
                                <span key={c} className="rounded-full bg-keynis-gray px-4 py-2 text-sm font-semibold text-keynis-navy">
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-keynis-navy">Services</h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {services.map((s) => (
                                <span key={s} className="rounded-full border border-keynis-navy px-4 py-2 text-sm font-semibold text-keynis-navy">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-wrap gap-3">
                    <Link href="/rfq?type=demande_produit" className="rounded-full bg-keynis-red px-6 py-3 text-sm font-bold text-white hover:bg-keynis-red-dark">
                        Demander un produit
                    </Link>
                    <Link href="/rfq?type=demande_sourcing" className="rounded-full bg-keynis-navy px-6 py-3 text-sm font-bold text-white hover:bg-keynis-navy-light">
                        Demander un sourcing
                    </Link>
                    <Link href="/produits" className="rounded-full border border-keynis-navy px-6 py-3 text-sm font-bold text-keynis-navy hover:bg-keynis-gray">
                        Voir le catalogue
                    </Link>
                </div>
            </section>
        </SiteLayout>
    );
}
