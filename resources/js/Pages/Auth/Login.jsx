import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Connexion" />

            <div className="mb-6 text-center">
                <h1 className="text-xl font-extrabold text-keynis-navy">Espace administration</h1>
                <p className="mt-1 text-sm text-slate-500">Connectez-vous pour accéder au back-office Keynis.</p>
            </div>

            {status && (
                <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <Field label="Adresse e-mail" error={errors.email}>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        className="input"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </Field>

                <Field label="Mot de passe" error={errors.password}>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        className="input"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </Field>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-slate-300 text-keynis-navy focus:ring-keynis-navy"
                        />
                        Se souvenir de moi
                    </label>

                    {canResetPassword && (
                        <Link href={route('password.request')} className="text-sm font-semibold text-keynis-red hover:underline">
                            Mot de passe oublié ?
                        </Link>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-full bg-keynis-red px-6 py-3 text-sm font-bold text-white hover:bg-keynis-red-dark disabled:opacity-50"
                >
                    Se connecter
                </button>
            </form>
        </GuestLayout>
    );
}

function Field({ label, error, children }) {
    return (
        <label className="block">
            <span className="mb-1 block text-sm font-semibold text-keynis-navy">{label}</span>
            {children}
            {error && <span className="mt-1 block text-xs text-keynis-red">{error}</span>}
        </label>
    );
}
