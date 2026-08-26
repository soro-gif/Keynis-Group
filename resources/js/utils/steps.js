export function isStepValid(data, requiredFields = []) {
    return requiredFields.every((field) => String(data[field] ?? '').trim() !== '');
}
