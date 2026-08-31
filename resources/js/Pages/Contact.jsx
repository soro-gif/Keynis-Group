import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import StepIndicator from '@/Components/Form/StepIndicator';
import StepNav from '@/Components/Form/StepNav';
import { isStepValid } from '@/utils/steps';

const steps = [
    { title: 'Vos coordonnées', required: ['name', 'email'], fields: ['name', 'email', 'phone'] },
    { title: 'Votre message', required: ['message'], fields: ['subject', 'message'] },
];

export default function Contact() {
    const [step, setStep] = useState(0);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    useEffect(() => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length === 0) return;
        const idx = steps.findIndex((s) => s.fields.some((f) => errorKeys.includes(f)));
        if (idx !== -1) setStep(idx);
    }, [errors]);

    function submit(e) {
        e.preventDefault();
        if (step < steps.length - 1) {
            if (!isStepValid(data, steps[step].required)) return;
            setStep((s) => s + 1);
            return;
        }
        post('/contact', { preserveScroll: true });
    }

    return (
        <SiteLayout
            title="Contact"
            description="Contactez Keynis Trading & Logistics Group pour vos besoins de sourcing, négoce, logistique ou distribution. Notre équipe vous répond rapidement."
        >
            <PageHero eyebrow="Contact" title="Parlons de votre besoin" description="Notre équipe vous répond rapidement." />

            <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-10 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-xl bg-keynis-gray p-6">
                        <p className="text-sm font-bold uppercase tracking-wide text-keynis-navy">Adresse</p>
                        <p className="mt-1 text-sm text-slate-600">Abidjan, Côte d'Ivoire</p>
                    </div>
                    <div className="rounded-xl bg-keynis-gray p-6">
                        <p className="text-sm font-bold uppercase tracking-wide text-keynis-navy">E-mail</p>
                        <p className="mt-1 text-sm text-slate-600">contact@keynisgroup.ci</p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <StepIndicator steps={steps.map((s) => s.title)} current={step} />

                    {step === 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Nom" required error={errors.name}>
                                <input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Ex : Koffi Jean-Baptiste"
                                    required
                                    className="input"
                                />
                            </Field>
                            <Field label="E-mail" required error={errors.email}>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Ex : nom@email.com"
                                    required
                                    className="input"
                                />
                            </Field>
                            <Field label="Téléphone" error={errors.phone}>
                                <input
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="Ex : 07 15 25 89 89"
                                    className="input"
                                />
                            </Field>
                        </div>
                    )}

                    {step === 1 && (
                        <>
                            <Field label="Sujet" error={errors.subject}>
                                <input
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    placeholder="Ex : Demande d'information"
                                    className="input"
                                />
                            </Field>
                            <Field label="Message" required error={errors.message}>
                                <textarea
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder="Décrivez votre besoin..."
                                    required
                                    className="input"
                                    rows={5}
                                />
                            </Field>
                        </>
                    )}

                    <StepNav
                        step={step}
                        isLast={step === steps.length - 1}
                        onBack={() => setStep((s) => s - 1)}
                        processing={processing}
                        submitLabel="Envoyer"
                        nextDisabled={!isStepValid(data, steps[step].required)}
                    />
                </form>
            </section>
        </SiteLayout>
    );
}

function Field({ label, required, error, children }) {
    return (
        <label className="block">
            <span className="mb-1 block text-sm font-semibold text-keynis-navy">
                {label}
                {required && <span className="text-keynis-red"> *</span>}
            </span>
            {children}
            {error && <span className="mt-1 block text-xs text-keynis-red">{error}</span>}
        </label>
    );
}
