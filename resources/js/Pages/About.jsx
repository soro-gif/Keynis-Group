import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';

const values = ['Fiabilité', 'Performance', 'Professionnalisme', 'Réactivité', 'Transparence', 'Excellence'];

const capabilities = [
    { title: 'Identifier', desc: 'les produits, fournisseurs, producteurs, stocks, actifs et opportunités.' },
    { title: 'Connecter', desc: 'les acheteurs, fournisseurs, producteurs et opérateurs.' },
    { title: 'Organiser', desc: 'les approvisionnements, transports, importations, exportations et distributions.' },
    { title: 'Suivre', desc: 'les marchés, demandes, offres et opportunités commerciales.' },
];

export default function About() {
    return (
        <SiteLayout title="À propos">
            <PageHero
                eyebrow="À propos"
                title="Un intermédiaire commercial et logistique au service des marchés"
                description="Keynis Trading & Logistics Group connecte rapidement l'offre disponible aux besoins du marché."
            />

            <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-extrabold text-keynis-navy">Qui sommes-nous ?</h2>
                <p className="mt-4 text-slate-600">
                    Keynis Trading &amp; Logistics Group est une entreprise orientée vers le négoce, le sourcing, les
                    commodities, la logistique, la mobilisation d'actifs et la distribution multicanale. Notre
                    positionnement repose sur une logique simple : identifier les opportunités, approvisionner les
                    marchés et organiser les flux.
                </p>

                <div className="mt-12 grid gap-8 sm:grid-cols-2">
                    <div className="rounded-2xl bg-keynis-gray p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-keynis-navy/10 text-keynis-navy">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-keynis-navy">Notre vision</h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Devenir la plateforme de référence connectant acheteurs, fournisseurs, producteurs et
                            opérateurs logistiques en Afrique et à l'international.
                        </p>
                    </div>
                    <div className="rounded-2xl bg-keynis-gray p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-keynis-navy/10 text-keynis-navy">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 6l1.035-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                            </svg>
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-keynis-navy">Notre mission</h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Faciliter le sourcing, le négoce et la logistique en mettant en relation rapidement les
                            besoins des acheteurs et les capacités disponibles sur le marché.
                        </p>
                    </div>
                </div>

                <h3 className="mt-12 text-lg font-bold text-keynis-navy">Nos valeurs</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                    {values.map((v) => (
                        <span key={v} className="rounded-full bg-keynis-navy px-4 py-2 text-sm font-semibold text-white">
                            {v}
                        </span>
                    ))}
                </div>
            </section>

            <section className="bg-keynis-navy py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-extrabold text-white">Quatre capacités essentielles</h2>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {capabilities.map((c) => (
                            <div key={c.title} className="rounded-2xl bg-white/5 p-6">
                                <h3 className="text-lg font-bold text-keynis-red">{c.title}</h3>
                                <p className="mt-2 text-sm text-slate-300">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
