export default function Field({ label, error, children }) {
    return (
        <label className="block">
            <span className="mb-1 block text-sm font-semibold text-keynis-navy">{label}</span>
            {children}
            {error && <span className="mt-1 block text-xs text-keynis-red">{error}</span>}
        </label>
    );
}
