export default function StepNav({ step, isLast, onBack, processing, submitLabel, nextDisabled }) {
    return (
        <div className="flex flex-col-reverse items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            {step > 0 ? (
                <button
                    type="button"
                    onClick={onBack}
                    className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                    ← Précédent
                </button>
            ) : <span className="hidden sm:block" />}
            <button
                type="submit"
                disabled={processing || nextDisabled}
                className="rounded-full bg-keynis-red px-6 py-3 text-sm font-bold text-white hover:bg-keynis-red-dark disabled:opacity-50"
            >
                {isLast ? submitLabel : 'Suivant →'}
            </button>
        </div>
    );
}
