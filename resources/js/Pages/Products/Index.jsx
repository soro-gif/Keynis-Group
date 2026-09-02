import { Link, router } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import Reveal from '@/Components/Motion/Reveal';
import Pagination from '@/Components/Pagination';
import { firstImage } from '@/utils/media';

export default function ProductsIndex({ products, categories, filters, relatedAssets = [] }) {
    function handleSearch(e) {
        e.preventDefault();
        router.get('/produits', { ...filters, search: e.target.search.value }, { preserveState: true });
    }

    function filterByCategory(slug) {
        router.get('/produits', { ...filters, category: slug || undefined }, { preserveState: true });
    }

    return (
        <SiteLayout
            title="Produits & Marchés"
            description="Catalogue produits Keynis : agriculture, BTP, industrie, équipements, eau & énergie, froid, matériaux et produits professionnels."
        >
            <PageHero
                eyebrow="Produits & Marchés"
                title="Catalogue produits Keynis"
                description="Agriculture, BTP, industrie, équipements, eau & énergie, froid, matériaux et produits professionnels."
            />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <aside className="lg:w-64">
                        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                            <input
                                name="search"
                                defaultValue={filters?.search || ''}
                                placeholder="Rechercher..."
                                className="w-full rounded-lg border-slate-300 text-sm focus:border-keynis-navy focus:ring-keynis-navy"
                            />
                        </form>

                        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-keynis-navy">Catégories</h3>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <button
                                    onClick={() => filterByCategory(null)}
                                    className={`w-full rounded-md px-3 py-2 text-left ${!filters?.category ? 'bg-keynis-navy text-white' : 'text-slate-600 hover:bg-keynis-gray'}`}
                                >
                                    Toutes les catégories
                                </button>
                            </li>
                            {categories.map((c) => (
                                <li key={c.id}>
                                    <button
                                        onClick={() => filterByCategory(c.slug)}
                                        className={`w-full rounded-md px-3 py-2 text-left ${filters?.category === c.slug ? 'bg-keynis-navy text-white' : 'text-slate-600 hover:bg-keynis-gray'}`}
                                    >
                                        {c.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <div className="flex-1">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {products.data.map((p, i) => (
                                <Reveal key={p.id} index={i}>
                                    <Link
                                        href={`/produits/${p.slug}`}
                                        className="block h-full overflow-hidden rounded-2xl border border-slate-200 transition hover:border-keynis-red hover:shadow-lg"
                                    >
                                        <div className="aspect-[4/3] w-full bg-keynis-gray">
                                            {firstImage(p.images) ? (
                                                <img src={firstImage(p.images)} alt={p.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">Keynis</div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            {p.category && (
                                                <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">{p.category.name}</p>
                                            )}
                                            <h3 className="mt-2 text-lg font-bold text-keynis-navy">{p.name}</h3>
                                            {p.brand && <p className="mt-1 text-sm text-slate-500">{p.brand}</p>}
                                        </div>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>

                        {products.data.length === 0 && relatedAssets.length === 0 && (
                            <p className="text-slate-500">Aucun produit trouvé pour ces critères.</p>
                        )}

                        {products.data.length === 0 && relatedAssets.length > 0 && (
                            <p className="text-slate-500">
                                Aucun produit dans cette catégorie pour le moment — mais des actifs sont disponibles ci-dessous.
                            </p>
                        )}

                        <Pagination links={products.links} />

                        {relatedAssets.length > 0 && (
                            <div className="mt-16 border-t border-slate-200 pt-10">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-keynis-navy">Actifs disponibles dans cette catégorie</h2>
                                    <Link href="/actifs" className="text-sm font-bold text-keynis-red hover:underline">Voir tous les actifs →</Link>
                                </div>
                                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {relatedAssets.map((asset, i) => (
                                        <Reveal key={asset.id} index={i} className="overflow-hidden rounded-2xl border border-slate-200">
                                            <Link href={`/actifs/${asset.id}`} className="block h-full transition hover:border-keynis-red hover:shadow-lg">
                                                <div className="aspect-[4/3] w-full bg-keynis-gray">
                                                    {firstImage(asset.photos) ? (
                                                        <img src={firstImage(asset.photos)} alt={asset.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">Pas de photo</div>
                                                    )}
                                                </div>
                                                <div className="p-6">
                                                    {asset.category && (
                                                        <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">{asset.category.name}</p>
                                                    )}
                                                    <h3 className="mt-2 text-lg font-bold text-keynis-navy">{asset.name}</h3>
                                                    {asset.brand && <p className="text-sm text-slate-500">{asset.brand} {asset.model}</p>}
                                                    {asset.location && <p className="mt-1 text-sm text-slate-500">📍 {asset.location}</p>}
                                                    <span className="mt-4 inline-block text-sm font-bold text-keynis-red">Voir les détails →</span>
                                                </div>
                                            </Link>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
