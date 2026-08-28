import { Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import { firstImage } from '@/utils/media';

export default function ProductShow({ product, related }) {
    return (
        <SiteLayout
            title={product.name}
            description={product.description || `${product.name} — découvrez ce produit proposé par Keynis Trading & Logistics Group.`}
        >
            <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <nav className="mb-6 text-sm text-slate-500">
                    <Link href="/produits" className="hover:text-keynis-navy">Produits & Marchés</Link>
                    {product.category && (
                        <>
                            {' / '}
                            <Link href={`/produits?category=${product.category.slug}`} className="hover:text-keynis-navy">
                                {product.category.name}
                            </Link>
                        </>
                    )}
                </nav>

                <h1 className="text-3xl font-extrabold text-keynis-navy">{product.name}</h1>
                {product.reference && <p className="mt-1 text-sm text-slate-500">Réf. {product.reference}</p>}

                {firstImage(product.images) && (
                    <img
                        src={firstImage(product.images)}
                        alt={product.name}
                        className="mt-6 h-72 w-full max-w-2xl rounded-2xl object-cover"
                    />
                )}

                <div className="mt-8 grid gap-10 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {product.description && (
                            <p className="text-slate-600">{product.description}</p>
                        )}

                        <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
                            {product.brand && (<><dt className="font-semibold text-keynis-navy">Marque</dt><dd className="text-slate-600">{product.brand}</dd></>)}
                            {product.origin && (<><dt className="font-semibold text-keynis-navy">Origine</dt><dd className="text-slate-600">{product.origin}</dd></>)}
                            {product.conditioning && (<><dt className="font-semibold text-keynis-navy">Conditionnement</dt><dd className="text-slate-600">{product.conditioning}</dd></>)}
                            {product.min_quantity && (<><dt className="font-semibold text-keynis-navy">Quantité minimale</dt><dd className="text-slate-600">{product.min_quantity}</dd></>)}
                            {product.location && (<><dt className="font-semibold text-keynis-navy">Localisation</dt><dd className="text-slate-600">{product.location}</dd></>)}
                            <dt className="font-semibold text-keynis-navy">Disponibilité</dt>
                            <dd className="text-slate-600 capitalize">{product.status.replace('_', ' ')}</dd>
                        </dl>
                    </div>

                    <div className="rounded-2xl bg-keynis-gray p-6">
                        <p className="text-sm font-bold uppercase tracking-wide text-keynis-navy">Prix</p>
                        <p className="mt-1 text-2xl font-extrabold text-keynis-navy">
                            {product.price_mode === 'affiche' && product.price ? `${product.price} FCFA` : 'Sur demande'}
                        </p>
                        <Link
                            href={`/rfq?type=demande_produit&subject=${encodeURIComponent(product.name)}`}
                            className="mt-6 block rounded-full bg-keynis-red px-6 py-3 text-center text-sm font-bold text-white hover:bg-keynis-red-dark"
                        >
                            Demander un devis
                        </Link>
                    </div>
                </div>

                {related?.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-xl font-bold text-keynis-navy">Produits similaires</h2>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {related.map((r) => (
                                <Link key={r.id} href={`/produits/${r.slug}`} className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-keynis-navy hover:border-keynis-red">
                                    {r.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </SiteLayout>
    );
}
