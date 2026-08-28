import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';

export default function MarketWatchShow({ article }) {
    return (
        <SiteLayout
            title={article.title}
            description={article.excerpt || `${article.title} — Market Watch Keynis Trading & Logistics Group.`}
        >
            <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <Link href="/market-watch" className="text-sm font-semibold text-keynis-red hover:underline">← Market Watch</Link>

                {article.category && (
                    <p className="mt-4 text-xs font-bold uppercase tracking-wide text-keynis-red">{article.category}</p>
                )}
                <h1 className="mt-2 text-3xl font-extrabold text-keynis-navy">{article.title}</h1>
                <p className="mt-2 text-sm text-slate-500">
                    {article.author && `${article.author} · `}
                    {article.published_at && new Date(article.published_at).toLocaleDateString('fr-FR')}
                </p>

                <div className="prose prose-slate mt-8 max-w-none">
                    {article.content ? (
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    ) : (
                        <p>{article.excerpt}</p>
                    )}
                </div>
            </article>
        </SiteLayout>
    );
}
