import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';

const channels = [
    { title: 'B2B', desc: 'Distribution directe aux entreprises, industriels et distributeurs.' },
    { title: 'Distribution professionnelle', desc: 'Réseau de partenaires et revendeurs qualifiés.' },
    { title: 'Distribution digitale', desc: 'Catalogue en ligne et mise en relation via la plateforme Keynis.' },
    { title: 'Distribution physique', desc: 'Livraison coordonnée via notre réseau logistique.' },
];

export default function Distribution() {
    return (
        <SiteLayout title="Distribution multicanale">
            <PageHero
                eyebrow="Distribution"
                title="Une distribution multicanale, professionnelle et digitale"
                description="Keynis combine circuits physiques et digitaux pour connecter l'offre à la demande sur l'ensemble de ses marchés."
            />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {channels.map((c) => (
                        <div key={c.title} className="rounded-2xl bg-keynis-gray p-6">
                            <h3 className="text-lg font-bold text-keynis-navy">{c.title}</h3>
                            <p className="mt-2 text-sm text-slate-600">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </SiteLayout>
    );
}
