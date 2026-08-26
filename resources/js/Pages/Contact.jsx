import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHero from '@/Components/Site/PageHero';
import StepIndicator from '@/Components/Form/StepIndicator';
import StepNav from '@/Components/Form/StepNav';
import { isStepValid } from '@/utils/steps';

const steps = [
    { title: 'Vos coordonnées', required: ['name', 'email'] },
    { title: 'Votre message', required: ['message'] },
];

export default function Contact() {
    const [step, setStep] = useState(0);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    function submit(e) {
        e.preventDefault();
        if (step < steps.length - 1) {
            if (!isStepValid(data, steps[step].required)) return;
            setStep((s) => s + 1);
            return;
        }
        post('/contact', { preserveScroll: true, onSuccess: () => { reset(); setStep(0); } });
    }

    return (
        <SiteLayout title="Contact">
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

                {recentlySuccessful && (
                    <p className="mb-6 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                        Votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais.
                    </p>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <StepIndicator steps={steps.map((s) => s.title)} current={step} />

                    {step === 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Nom" error={errors.name}>
                                <input value={data.name} onChange={(e) => setData('name', e.target.value)} className="input" />
                            </Field>
                            <Field label="E-mail" error={errors.email}>
                                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="input" />
                            </Field>
                            <Field label="Téléphone" error={errors.phone}>
                                <input value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="input" />
                            </Field>
                        </div>
                    )}

                    {step === 1 && (
                        <>
                            <Field label="Sujet" error={errors.subject}>
                                <input value={data.subject} onChange={(e) => setData('subject', e.target.value)} className="input" />
                            </Field>
                            <Field label="Message" error={errors.message}>
                                <textarea value={data.message} onChange={(e) => setData('message', e.target.value)} className="input" rows={5} />
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

function Field({ label, error, children }) {
    return (
        <label className="block">
            <span className="mb-1 block text-sm font-semibold text-keynis-navy">{label}</span>
            {children}
            {error && <span className="mt-1 block text-xs text-keynis-red">{error}</span>}
        </label>
    );
}
