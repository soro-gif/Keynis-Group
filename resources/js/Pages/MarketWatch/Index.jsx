import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import Reveal from '@/Components/Motion/Reveal';
import Pagination from '@/Components/Pagination';

export default function MarketWatchIndex({ articles }) {
    return (
        <SiteLayout
            title="Market Watch"
            description="Veille et intelligence commerciale Keynis : prix, tendances, opportunités et analyses sur les marchés suivis."
        >
            <PageHero
                eyebrow="Market Watch"
                title="Veille et intelligence commerciale"
                description="Prix, tendances, opportunités et analyses sur les marchés suivis par Keynis."
            />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.data.map((article, i) => (
                        <Reveal key={article.id} index={i}>
                            <Link
                                href={`/market-watch/${article.slug}`}
                                className="block h-full rounded-2xl border border-slate-200 p-6 transition hover:border-keynis-red hover:shadow-lg"
                            >
                                {article.category && (
                                    <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">{article.category}</p>
                                )}
                                <h3 className="mt-2 font-bold text-keynis-navy">{article.title}</h3>
                                {article.excerpt && <p className="mt-2 text-sm text-slate-600 line-clamp-3">{article.excerpt}</p>}
                            </Link>
                        </Reveal>
                    ))}
                </div>

                {articles.data.length === 0 && (
                    <p className="text-slate-500">Aucune publication pour le moment.</p>
                )}

                <Pagination links={articles.links} />
            </section>
        </SiteLayout>
    );
}
