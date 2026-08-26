import { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

const nav = [
    { label: 'Tableau de bord', href: '/admin' },
    { label: 'Demandes (RFQ)', href: '/admin/rfqs' },
    { label: 'Produits', href: '/admin/produits' },
    { label: 'Actifs', href: '/admin/actifs' },
    { label: 'Partenaires', href: '/admin/partenaires' },
    { label: 'Messages', href: '/admin/messages' },
];

export default function AdminLayout({ title, children }) {
    const { url, props } = usePage();
    const user = props.auth.user;
    const [open, setOpen] = useState(false);
    const [flashSuccess, setFlashSuccess] = useState(props.flash?.success ?? null);

    useEffect(() => {
        setFlashSuccess(props.flash?.success ?? null);
    }, [props.flash?.success]);

    useEffect(() => {
        if (!flashSuccess) return;
        const timer = setTimeout(() => setFlashSuccess(null), 4000);
        return () => clearTimeout(timer);
    }, [flashSuccess]);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Head title={`Admin · ${title}`} />

            <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-keynis-navy transition-transform lg:static lg:translate-x-0 print:hidden ${open ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex h-16 items-center gap-2 px-5">
                    <img src="/images/logo-keynis.png" alt="Keynis" className="h-9 w-auto rounded bg-white p-1" />
                    <span className="text-sm font-bold text-white">Admin</span>
                </div>

                <nav className="mt-4 space-y-1 px-3">
                    {nav.map((item) => {
                        const active = item.href === '/admin' ? url === '/admin' : url.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`block rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                                    active ? 'bg-keynis-red text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full border-t border-white/10 p-4">
                    <Link href="/" className="block text-xs font-semibold text-slate-400 hover:text-white">
                        ← Retour au site
                    </Link>
                </div>
            </aside>

            {open && (
                <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
            )}

            <div className="flex-1 lg:pl-0">
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 print:hidden">
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        className="rounded-md p-2 text-keynis-navy lg:hidden"
                        aria-label="Ouvrir le menu"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <h1 className="text-lg font-bold text-keynis-navy">{title}</h1>

                    <div className="flex items-center gap-4">
                        <span className="hidden text-sm text-slate-500 sm:inline">{user.name}</span>
                        <Link href="/logout" method="post" as="button" className="text-sm font-semibold text-keynis-red hover:underline">
                            Déconnexion
                        </Link>
                    </div>
                </header>

                <main className="p-4 sm:p-6">
                    {flashSuccess && (
                        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                            <span>{flashSuccess}</span>
                            <button
                                type="button"
                                onClick={() => setFlashSuccess(null)}
                                className="text-green-700/60 hover:text-green-700"
                                aria-label="Fermer"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
