import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';

export default function ProjectShow({ project }) {
    return (
        <SiteLayout
            title={project.title}
            description={project.problem || `${project.title} — un projet réalisé par Keynis Trading & Logistics Group.`}
        >
            <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <Link href="/projets" className="text-sm font-semibold text-keynis-red hover:underline">← Projets & Réalisations</Link>

                <h1 className="mt-4 text-3xl font-extrabold text-keynis-navy">{project.title}</h1>
                <p className="mt-2 text-sm text-slate-500">
                    {[project.client_sector, project.location].filter(Boolean).join(' · ')}
                </p>

                <div className="mt-8 space-y-6">
                    {project.problem && (
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-wide text-keynis-navy">Problématique</h2>
                            <p className="mt-2 text-slate-600">{project.problem}</p>
                        </div>
                    )}
                    {project.solution && (
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-wide text-keynis-navy">Solution apportée</h2>
                            <p className="mt-2 text-slate-600">{project.solution}</p>
                        </div>
                    )}
                    {project.resources_used && (
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-wide text-keynis-navy">Produits / services mobilisés</h2>
                            <p className="mt-2 text-slate-600">{project.resources_used}</p>
                        </div>
                    )}
                    {project.results && (
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-wide text-keynis-navy">Résultats</h2>
                            <p className="mt-2 text-slate-600">{project.results}</p>
                        </div>
                    )}
                </div>
            </article>
        </SiteLayout>
    );
}
