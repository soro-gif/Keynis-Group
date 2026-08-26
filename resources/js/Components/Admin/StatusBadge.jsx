const palette = {
    // RFQ
    nouvelle: 'bg-blue-100 text-blue-700',
    en_analyse: 'bg-amber-100 text-amber-700',
    sourcing: 'bg-amber-100 text-amber-700',
    offre_disponible: 'bg-indigo-100 text-indigo-700',
    negociation: 'bg-indigo-100 text-indigo-700',
    validee: 'bg-green-100 text-green-700',
    livraison: 'bg-green-100 text-green-700',
    cloturee: 'bg-slate-200 text-slate-600',
    annulee: 'bg-red-100 text-red-700',
    rejetee: 'bg-red-100 text-red-700',
    en_attente: 'bg-amber-100 text-amber-700',
    // Asset / Partner / Contact
    publie: 'bg-green-100 text-green-700',
    indisponible: 'bg-slate-200 text-slate-600',
    nouveau: 'bg-blue-100 text-blue-700',
    en_qualification: 'bg-amber-100 text-amber-700',
    valide: 'bg-green-100 text-green-700',
    rejete: 'bg-red-100 text-red-700',
    traite: 'bg-green-100 text-green-700',
};

export default function StatusBadge({ status }) {
    return (
        <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${palette[status] || 'bg-slate-100 text-slate-600'}`}>
            {status?.replace(/_/g, ' ')}
        </span>
    );
}
