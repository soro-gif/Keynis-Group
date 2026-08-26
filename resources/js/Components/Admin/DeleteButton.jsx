import { router } from '@inertiajs/react';

export default function DeleteButton({ url, label = 'Supprimer', title, confirmMessage = 'Confirmer la suppression ? Cette action est irréversible.', className = '', onSuccess }) {
    function handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!window.confirm(confirmMessage)) return;
        router.delete(url, { preserveScroll: true, onSuccess });
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            title={title}
            className={className || 'text-sm font-semibold text-red-600 hover:underline'}
        >
            {label}
        </button>
    );
}
