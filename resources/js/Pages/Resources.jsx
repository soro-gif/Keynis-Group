import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';

const resourceTypes = [
    'Catalogues', 'Fiches techniques', 'Guides', 'Analyses marché',
    'Market Watch', 'Actualités', 'Publications', 'Documents commerciaux',
];

export default function Resources() {
    return (
        <SiteLayout
            title="Ressources"
            description="Retrouvez ici les catalogues, guides, fiches techniques et documents Keynis utiles à vos démarches de sourcing, négoce et logistique."
        >
            <PageHero
                eyebrow="Ressources"
                title="Catalogues, guides et documents Keynis"
                description="Retrouvez ici les documents utiles à vos démarches de sourcing, négoce et logistique."
            />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {resourceTypes.map((r) => (
                        <div key={r} className="rounded-xl border border-slate-200 p-6 text-center">
                            <p className="font-semibold text-keynis-navy">{r}</p>
                            <p className="mt-1 text-xs text-slate-400">Bientôt disponible</p>
                        </div>
                    ))}
                </div>
            </section>
        </SiteLayout>
    );
}
