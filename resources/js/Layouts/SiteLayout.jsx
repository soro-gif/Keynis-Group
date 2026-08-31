import { useRef, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';

const activitiesNav = [
    { label: 'Trading & Négoce', href: '/trading', desc: 'Achat-revente, sourcing, import-export' },
    { label: 'Commodities', href: '/commodities', desc: 'Cacao, café, anacarde, céréales' },
    { label: 'Logistics', href: '/logistics', desc: 'Transport, transit, stockage' },
    { label: 'Location & Actifs', href: '/actifs', desc: 'Véhicules, engins, équipements' },
    { label: 'Distribution', href: '/distribution', desc: 'Circuits B2B et digitaux' },
];

const navBefore = [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '/a-propos' },
];

const navAfter = [
    { label: 'Produits & Marchés', href: '/produits' },
    { label: 'Partenaires', href: '/partenaires' },
    { label: 'Market Watch', href: '/market-watch' },
    { label: 'Contact / RFQ', href: '/rfq' },
];

const WHATSAPP_NUMBER = '+2250715258988';

function isActive(url, href) {
    return href === '/' ? url === '/' : url.startsWith(href);
}

const DEFAULT_DESCRIPTION =
    "Keynis Trading & Logistics Group : sourcing, négoce, commodities, logistique, location d'actifs et distribution en Côte d'Ivoire et à l'international.";

export default function SiteLayout({ title, description = DEFAULT_DESCRIPTION, children }) {
    const [open, setOpen] = useState(false);
    const [mobileActivitiesOpen, setMobileActivitiesOpen] = useState(false);
    const { url, props } = usePage();
    const user = props.auth?.user;
    const activitiesActive = activitiesNav.some((item) => isActive(url, item.href));

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Head title={title}>
                <meta name="description" content={description} />
                <meta property="og:title" content={title ? `${title} | Keynis Trading & Logistics Group` : 'Keynis Trading & Logistics Group'} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/logo-keynis.png" />
            </Head>

            <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur print:hidden">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src="/images/logo-keynis.png"
                            alt="Keynis Trading & Logistics Group"
                            className="h-10 w-auto sm:h-12"
                        />
                    </Link>

                    <nav className="hidden items-center gap-7 lg:flex">
                        {navBefore.map((item) => (
                            <NavLink key={item.href} href={item.href} active={isActive(url, item.href)}>
                                {item.label}
                            </NavLink>
                        ))}

                        <ActivitiesDropdown active={activitiesActive} />

                        {navAfter.map((item) => (
                            <NavLink key={item.href} href={item.href} active={isActive(url, item.href)}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <Link
                        href={user ? '/dashboard' : '/login'}
                        className="hidden rounded-full bg-keynis-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-keynis-red-dark lg:inline-block"
                    >
                        {user ? user.name : 'Se connecter'}
                    </Link>

                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        className="inline-flex items-center rounded-md p-2 text-keynis-navy lg:hidden"
                        aria-label="Ouvrir le menu"
                    >
                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {open ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                <AnimatePresence>
                    {open && (
                        <motion.nav
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
                        >
                            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
                                {navBefore.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`rounded-md px-3 py-2 text-sm font-semibold ${isActive(url, item.href) ? 'bg-keynis-gray text-keynis-red' : 'text-keynis-navy hover:bg-keynis-gray'}`}
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => setMobileActivitiesOpen((v) => !v)}
                                    className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold ${activitiesActive ? 'text-keynis-red' : 'text-keynis-navy'}`}
                                >
                                    Activités
                                    <svg className={`h-4 w-4 transition-transform ${mobileActivitiesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {mobileActivitiesOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden pl-3"
                                        >
                                            {activitiesNav.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={`block rounded-md px-3 py-2 text-sm font-semibold ${isActive(url, item.href) ? 'bg-keynis-gray text-keynis-red' : 'text-slate-600 hover:bg-keynis-gray'}`}
                                                    onClick={() => setOpen(false)}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {navAfter.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`rounded-md px-3 py-2 text-sm font-semibold ${isActive(url, item.href) ? 'bg-keynis-gray text-keynis-red' : 'text-keynis-navy hover:bg-keynis-gray'}`}
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                <Link
                                    href={user ? '/dashboard' : '/login'}
                                    className="mt-2 rounded-full bg-keynis-red px-5 py-2.5 text-center text-sm font-bold text-white"
                                    onClick={() => setOpen(false)}
                                >
                                    {user ? user.name : 'Se connecter'}
                                </Link>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </header>

            <motion.main
                key={url}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1"
            >
                {children}
            </motion.main>

            <Footer />

            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 print:hidden"
                aria-label="Contacter Keynis sur WhatsApp"
            >
                <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor">
                    <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.664 4.523 1.813 6.383L4 29l7.805-1.773A11.94 11.94 0 0016.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.75a9.7 9.7 0 01-4.945-1.352l-.354-.21-4.633 1.051 1.031-4.516-.23-.367A9.71 9.71 0 016.25 15c0-5.38 4.375-9.75 9.754-9.75S25.75 9.62 25.75 15s-4.371 9.75-9.746 9.75zm5.36-7.293c-.293-.148-1.734-.855-2.004-.953-.27-.098-.465-.148-.66.148-.195.293-.758.953-.93 1.148-.172.195-.34.219-.633.074-.293-.148-1.238-.457-2.359-1.457-.871-.777-1.461-1.738-1.633-2.031-.172-.293-.02-.453.129-.598.133-.129.293-.34.441-.512.148-.172.195-.293.293-.488.098-.195.05-.367-.023-.512-.074-.148-.66-1.594-.906-2.184-.238-.574-.484-.496-.66-.504-.172-.008-.367-.008-.563-.008a1.08 1.08 0 00-.781.363c-.27.293-1.031 1.008-1.031 2.457s1.055 2.848 1.203 3.043c.148.195 2.078 3.172 5.031 4.449.703.305 1.25.484 1.68.617.707.223 1.348.191 1.855.117.566-.086 1.734-.707 1.98-1.395.246-.688.246-1.277.172-1.398-.074-.121-.27-.195-.563-.34z" />
                </svg>
            </a>
        </div>
    );
}

function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`relative py-1 text-[13px] font-semibold uppercase tracking-wide transition after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-keynis-red after:transition-all ${
                active
                    ? 'text-keynis-red after:w-full'
                    : 'text-keynis-navy after:w-0 hover:text-keynis-red hover:after:w-full'
            }`}
        >
            {children}
        </Link>
    );
}

function ActivitiesDropdown({ active }) {
    const [open, setOpen] = useState(false);
    const closeTimer = useRef(null);

    function handleEnter() {
        clearTimeout(closeTimer.current);
        setOpen(true);
    }

    function handleLeave() {
        closeTimer.current = setTimeout(() => setOpen(false), 150);
    }

    return (
        <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`relative flex items-center gap-1 py-1 text-[13px] font-semibold uppercase tracking-wide transition after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-keynis-red after:transition-all ${
                    active || open
                        ? 'text-keynis-red after:w-full'
                        : 'text-keynis-navy after:w-0 hover:text-keynis-red hover:after:w-full'
                }`}
            >
                Activités
                <svg className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full z-50 mt-4 w-72 -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl"
                    >
                        {activitiesNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="block rounded-xl px-4 py-2.5 transition hover:bg-keynis-gray"
                            >
                                <p className="text-sm font-bold text-keynis-navy">{item.label}</p>
                                <p className="text-xs text-slate-500">{item.desc}</p>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Footer() {
    return (
        <footer className="bg-keynis-navy text-slate-200 print:hidden">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <img
                            src="/images/logo-keynis.png"
                            alt="Keynis"
                            className="mb-4 h-12 w-auto bg-white rounded p-1"
                        />
                        <p className="text-sm text-slate-300">
                            Identifier les opportunités. Approvisionner les marchés. Organiser les flux.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Activités</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li><Link href="/trading" className="hover:text-white">Trading & Négoce</Link></li>
                            <li><Link href="/commodities" className="hover:text-white">Commodities & Agribusiness</Link></li>
                            <li><Link href="/logistics" className="hover:text-white">Logistics & Supply Chain</Link></li>
                            <li><Link href="/actifs" className="hover:text-white">Location & Actifs</Link></li>
                            <li><Link href="/distribution" className="hover:text-white">Distribution</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Ressources</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li><Link href="/produits" className="hover:text-white">Produits & Marchés</Link></li>
                            <li><Link href="/partenaires" className="hover:text-white">Partenaires</Link></li>
                            <li><Link href="/market-watch" className="hover:text-white">Market Watch</Link></li>
                            <li><Link href="/projets" className="hover:text-white">Projets & Réalisations</Link></li>
                            <li><Link href="/ressources" className="hover:text-white">Ressources</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Contact</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li>Abidjan, Côte d'Ivoire</li>
                            <li>contact@keynisgroup.ci</li>
                            <li>
                                <Link href="/rfq" className="font-semibold text-keynis-red hover:text-white">
                                    Faire une demande RFQ →
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
                    <p>© {new Date().getFullYear()} Keynis Trading & Logistics Group. Tous droits réservés.</p>
                    <p className="tracking-wide">CONNECTER • SOURCER • LIVRER • EXCELLER</p>
                </div>
            </div>
        </footer>
    );
}
