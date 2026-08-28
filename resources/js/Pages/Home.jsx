import { Link } from '@inertiajs/react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import SiteLayout from '@/Layouts/SiteLayout';
import Reveal from '@/Components/Motion/Reveal';
import { firstImage } from '@/utils/media';

const activities = [
    { title: 'Trading & Négoce', desc: 'Achat-revente, sourcing, importation et exportation de produits professionnels.', href: '/trading' },
    { title: 'Commodities', desc: 'Cacao, café, anacarde, céréales et produits agricoles transformés.', href: '/commodities' },
    { title: 'Agribusiness', desc: 'Connexion producteurs, coopératives et transformateurs aux marchés.', href: '/commodities' },
    { title: 'Logistique', desc: 'Transport routier, maritime, aérien, transit et dédouanement.', href: '/logistics' },
    { title: 'Supply Chain', desc: 'Approvisionnement, manutention, acheminement et livraison.', href: '/logistics' },
    { title: "Location d'actifs", desc: 'Véhicules, engins BTP, machines agricoles et infrastructures.', href: '/actifs' },
    { title: 'Distribution', desc: 'Circuits B2B, distribution professionnelle et digitale.', href: '/distribution' },
];

const steps = [
    { n: '1', title: 'Besoin', desc: 'Le client soumet sa demande.' },
    { n: '2', title: 'Analyse', desc: 'Keynis analyse les spécifications et le marché.' },
    { n: '3', title: 'Sourcing', desc: 'Recherche de fournisseurs, producteurs ou capacités.' },
    { n: '4', title: 'Négociation', desc: 'Analyse des conditions techniques et commerciales.' },
    { n: '5', title: 'Mobilisation', desc: 'Organisation des produits, stocks ou actifs.' },
    { n: '6', title: 'Livraison', desc: 'Coordination logistique et distribution.' },
];

export default function Home({ categories = [], featuredProducts = [], latestArticles = [] }) {
    return (
        <SiteLayout
            title="Sourcing, Négoce, Commodities, Logistics & Distribution"
            description="Keynis Trading & Logistics Group identifie les opportunités, approvisionne les marchés et organise les flux : trading, commodities, logistique, location d'actifs et distribution en Côte d'Ivoire."
        >
            {/* Hero */}
            <section className="overflow-hidden bg-keynis-navy">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mb-4 text-sm font-bold uppercase tracking-widest text-keynis-red"
                        >
                            Keynis Trading &amp; Logistics Group
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.08 }}
                            className="text-4xl font-extrabold leading-tight text-white sm:text-5xl"
                        >
                            Identifier les opportunités.<br />Approvisionner les marchés.<br />Organiser les flux.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.16 }}
                            className="mt-6 text-lg text-slate-300"
                        >
                            Sourcing • Négoce • Commodities • Logistics • Distribution
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.24 }}
                            className="mt-8 flex flex-wrap gap-3"
                        >
                            <Link href="/rfq?type=demande_produit" className="rounded-full bg-keynis-red px-6 py-3 text-sm font-bold text-white transition hover:bg-keynis-red-dark hover:scale-[1.03] active:scale-95">
                                Demander un produit
                            </Link>
                            <Link href="/rfq?type=offre_produit" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-keynis-navy transition hover:bg-slate-100 hover:scale-[1.03] active:scale-95">
                                Proposer un produit
                            </Link>
                            <Link href="/actifs" className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 hover:scale-[1.03] active:scale-95">
                                Rechercher un actif
                            </Link>
                            <Link href="/rfq?type=demande_logistique" className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 hover:scale-[1.03] active:scale-95">
                                Solution logistique
                            </Link>
                        </motion.div>
                    </div>

                    <HeroImage />
                </div>
            </section>

            {/* Modèle */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-3">
                    {[
                        { q: 'Vous recherchez un produit ?', a: 'Keynis identifie et mobilise les fournisseurs adaptés.' },
                        { q: 'Vous disposez d’un produit ou d’un stock ?', a: 'Keynis peut identifier des opportunités de commercialisation.' },
                        { q: 'Vous recherchez un transport ou un actif ?', a: 'Keynis mobilise son réseau de partenaires.' },
                    ].map((item, i) => (
                        <Reveal key={item.q} index={i} className="rounded-2xl border border-slate-100 bg-keynis-gray p-6">
                            <h3 className="text-lg font-bold text-keynis-navy">{item.q}</h3>
                            <p className="mt-2 text-sm text-slate-600">{item.a}</p>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Activités */}
            <section className="bg-keynis-gray py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal as="h2" className="text-2xl font-extrabold text-keynis-navy sm:text-3xl">
                        Nos activités
                    </Reveal>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {activities.map((a, i) => (
                            <Reveal key={a.title} index={i}>
                                <Link
                                    href={a.href}
                                    className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-keynis-red hover:shadow-lg"
                                >
                                    <h3 className="text-lg font-bold text-keynis-navy group-hover:text-keynis-red">{a.title}</h3>
                                    <p className="mt-2 text-sm text-slate-600">{a.desc}</p>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Produits & marchés */}
            {categories.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-extrabold text-keynis-navy sm:text-3xl">Produits &amp; marchés</h2>
                        <Link href="/produits" className="text-sm font-bold text-keynis-red hover:underline">Voir tout →</Link>
                    </div>
                    <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
                        {categories.map((c, i) => (
                            <Reveal key={c.id} index={i}>
                                <Link
                                    href={`/produits?category=${c.slug}`}
                                    className="block rounded-xl border border-slate-200 p-4 text-center text-sm font-semibold text-keynis-navy transition hover:border-keynis-red hover:text-keynis-red"
                                >
                                    {c.name}
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Produits en vedette */}
            {featuredProducts.length > 0 && (
                <section className="bg-keynis-gray py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-extrabold text-keynis-navy sm:text-3xl">Produits en vedette</h2>
                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredProducts.map((p, i) => (
                                <Reveal key={p.id} index={i}>
                                    <Link
                                        href={p.type === 'commodity' ? '/commodities' : `/produits/${p.slug}`}
                                        className="block h-full overflow-hidden rounded-2xl bg-white transition hover:shadow-lg"
                                    >
                                        <div className="aspect-[4/3] w-full overflow-hidden bg-keynis-navy/5">
                                            {firstImage(p.images) ? (
                                                <motion.img
                                                    src={firstImage(p.images)}
                                                    alt={p.name}
                                                    whileHover={{ scale: 1.08 }}
                                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">Keynis</div>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-keynis-navy">{p.name}</h3>
                                            {p.origin && <p className="mt-1 text-sm text-slate-500">{p.origin}</p>}
                                        </div>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Comment ça marche */}
            <section className="bg-keynis-navy py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal as="h2" className="text-2xl font-extrabold text-white sm:text-3xl">
                        Comment fonctionne Keynis ?
                    </Reveal>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
                        {steps.map((s, i) => (
                            <Reveal key={s.n} index={i} className="rounded-2xl bg-white/5 p-5">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-keynis-red text-sm font-bold text-white">
                                    {s.n}
                                </div>
                                <h3 className="font-bold text-white">{s.title}</h3>
                                <p className="mt-1 text-sm text-slate-300">{s.desc}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Market watch preview */}
            {latestArticles.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-extrabold text-keynis-navy sm:text-3xl">Market Watch</h2>
                        <Link href="/market-watch" className="text-sm font-bold text-keynis-red hover:underline">Toute la veille →</Link>
                    </div>
                    <div className="mt-8 grid gap-6 sm:grid-cols-3">
                        {latestArticles.map((article, i) => (
                            <Reveal key={article.id} index={i}>
                                <Link
                                    href={`/market-watch/${article.slug}`}
                                    className="block h-full rounded-2xl border border-slate-200 p-6 transition hover:border-keynis-red hover:shadow-lg"
                                >
                                    <p className="text-xs font-bold uppercase tracking-wide text-keynis-red">{article.category}</p>
                                    <h3 className="mt-2 font-bold text-keynis-navy">{article.title}</h3>
                                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">{article.excerpt}</p>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA band */}
            <section className="bg-keynis-red">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:px-8">
                    <h2 className="text-center text-2xl font-extrabold text-white lg:text-left">
                        Prêt à connecter votre besoin au marché ?
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/rfq" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-keynis-red transition hover:bg-slate-100 hover:scale-[1.03] active:scale-95">
                            Demander un devis
                        </Link>
                        <Link href="/partenaires" className="rounded-full border border-white/50 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 hover:scale-[1.03] active:scale-95">
                            Devenir partenaire
                        </Link>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}

function HeroImage() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const spring = { stiffness: 200, damping: 20 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), spring);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), spring);

    function handleMouseMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 800 }}
            className="flex items-center justify-center"
        >
            <motion.img
                src="/images/logo-keynis.png"
                alt="Keynis Trading & Logistics Group"
                style={{ rotateX, rotateY }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                className="w-full max-w-xs cursor-pointer rounded-2xl bg-white p-6 shadow-2xl sm:max-w-sm sm:p-8 lg:max-w-md"
            />
        </motion.div>
    );
}
