import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function ConfirmSubmissionButton({ confirmUrl, confirmedAt }) {
    const [processing, setProcessing] = useState(false);

    if (confirmedAt) {
        return (
            <span className="rounded-full bg-green-50 px-5 py-2.5 text-sm font-bold text-green-700">
                ✓ Informations confirmées
            </span>
        );
    }

    function handleConfirm() {
        setProcessing(true);
        router.post(confirmUrl, {}, {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
        });
    }

    return (
        <button
            type="button"
            onClick={handleConfirm}
            disabled={processing}
            className="rounded-full bg-keynis-red px-5 py-2.5 text-sm font-bold text-white hover:bg-keynis-red-dark disabled:opacity-60"
        >
            {processing ? 'Validation...' : 'Valider mes informations'}
        </button>
    );
}
