import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import Reveal from '@/Components/Motion/Reveal';

export default function ProjectsIndex({ projects }) {
    return (
        <SiteLayout
            title="Projets & Réalisations"
            description="Un aperçu des opérations de sourcing, mobilisations logistiques et distributions réalisées par Keynis Trading & Logistics Group."
        >
            <PageHero
                eyebrow="Projets & Réalisations"
                title="Nos opérations sur le terrain"
                description="Un aperçu des sourcing, mobilisations logistiques et distributions réalisés par Keynis."
            />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, i) => (
                        <Reveal key={project.id} index={i}>
                            <Link
                                href={`/projets/${project.slug}`}
                                className="block h-full rounded-2xl border border-slate-200 p-6 transition hover:border-keynis-red hover:shadow-lg"
                            >
                                {project.client_sector && (
                                    <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">{project.client_sector}</p>
                                )}
                                <h3 className="mt-2 font-bold text-keynis-navy">{project.title}</h3>
                                {project.location && <p className="mt-1 text-sm text-slate-500">📍 {project.location}</p>}
                            </Link>
                        </Reveal>
                    ))}
                </div>

                {projects.length === 0 && (
                    <p className="text-slate-500">Aucune réalisation publiée pour le moment.</p>
                )}
            </section>
        </SiteLayout>
    );
}
