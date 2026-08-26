import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-keynis-gray px-4 py-10">
            <div className="mb-8">
                <Link href="/">
                    <img src="/images/logo-keynis.png" alt="Keynis Group" className="h-16 w-auto sm:h-20" />
                </Link>
            </div>

            <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-xl sm:max-w-md sm:px-10">
                {children}
            </div>

            <p className="mt-8 text-xs font-medium text-slate-400">
                © {new Date().getFullYear()} Keynis Trading &amp; Logistics Group
            </p>
        </div>
    );
}
