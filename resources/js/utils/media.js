const MEDIA_BASE_URL = (typeof window !== 'undefined' && window.mediaBaseUrl) || '/storage';

export function mediaUrl(path) {
    return path ? `${MEDIA_BASE_URL}/${path}` : null;
}

export function firstImage(images) {
    return images && images.length > 0 ? mediaUrl(images[0]) : null;
}
