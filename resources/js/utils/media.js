export function mediaUrl(path) {
    return path ? `/storage/${path}` : null;
}

export function firstImage(images) {
    return images && images.length > 0 ? mediaUrl(images[0]) : null;
}
