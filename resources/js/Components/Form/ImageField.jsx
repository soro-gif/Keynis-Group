import { useState } from 'react';
import { firstImage } from '@/utils/media';
import Field from '@/Components/Form/Field';

export default function ImageField({ label = 'Image', existingImages, value, onChange, error }) {
    const [preview, setPreview] = useState(null);

    function handleChange(e) {
        const file = e.target.files?.[0] ?? null;
        onChange(file);
        setPreview(file ? URL.createObjectURL(file) : null);
    }

    const currentUrl = preview || firstImage(existingImages);

    return (
        <Field label={label} error={error}>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                {currentUrl ? (
                    <img src={currentUrl} alt="" className="h-20 w-20 shrink-0 rounded-lg border border-slate-200 object-cover" />
                ) : (
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-300 text-xs text-slate-400">
                        Aucune
                    </div>
                )}
                <input type="file" accept="image/*" onChange={handleChange} className="input min-w-0" />
            </div>
        </Field>
    );
}
