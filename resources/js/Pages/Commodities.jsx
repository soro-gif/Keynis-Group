import { Link, router } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import Reveal from '@/Components/Motion/Reveal';
import { firstImage } from '@/utils/media';

export default function Commodities({ commodities, filters }) {
    function handleSearch(e) {
        e.preventDefault();
        router.get('/commodities', { search: e.target.search.value }, { preserveState: true });
    }

    return (
        <SiteLayout title="Commodities & Agribusiness">
            <PageHero
                eyebrow="Commodities & Agribusiness"
                title="Cacao, café, anacarde et produits agricoles"
                description="Keynis connecte producteurs, coopératives et transformateurs aux marchés internationaux."
            />

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <form onSubmit={handleSearch} className="mb-8 flex max-w-md gap-2">
                    <input
                        name="search"
                        defaultValue={filters?.search || ''}
                        placeholder="Rechercher une commodity..."
                        className="w-full rounded-lg border-slate-300 focus:border-keynis-navy focus:ring-keynis-navy"
                    />
                    <button className="rounded-lg bg-keynis-navy px-4 py-2 text-sm font-bold text-white">Rechercher</button>
                </form>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {commodities.data.map((item, i) => (
                        <Reveal key={item.id} index={i} className="overflow-hidden rounded-2xl border border-slate-200">
                            <div className="aspect-[4/3] w-full bg-keynis-gray">
                                {firstImage(item.images) ? (
                                    <img src={firstImage(item.images)} alt={item.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">Keynis</div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-keynis-navy">{item.name}</h3>
                                {item.origin && <p className="mt-1 text-sm text-slate-500">Origine : {item.origin}</p>}
                                {item.description && <p className="mt-2 text-sm text-slate-600 line-clamp-3">{item.description}</p>}
                                <Link
                                    href={`/rfq?type=demande_commodity&subject=${encodeURIComponent(item.name)}`}
                                    className="mt-4 inline-block text-sm font-bold text-keynis-red hover:underline"
                                >
                                    Demander cette commodity →
                                </Link>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {commodities.data.length === 0 && (
                    <p className="text-slate-500">Aucune commodity trouvée pour le moment.</p>
                )}
            </section>
        </SiteLayout>
    );
}
