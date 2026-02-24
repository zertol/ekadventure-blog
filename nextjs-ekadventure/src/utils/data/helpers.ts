export const groupImagesFromBlocks = (blocks: any[]) => {
    if (!blocks || !Array.isArray(blocks)) return [];

    const result = [];
    let imageGroup = [];

    for (const block of blocks) {
        if (block._type === "externalImage") {
            imageGroup.push(block);
        } else {
            if (imageGroup.length) {
                result.push({ _type: "imageGroup", images: imageGroup });
                imageGroup = [];
            }
            result.push(block);
        }
    }

    // Handle any remaining images at the end
    if (imageGroup.length) {
        result.push({ _type: "imageGroupLast", images: imageGroup });
    }

    return result;
};


// Helper to create image pairs for displaying multiple images side by side two at a time.
// If there is an odd number of images, the last one will be displayed alone.
export const groupImagePairsOrSingle = (images: ImageType[]): ImageType[][] => {
    const imagePairs = [];

    for (let i = 0; i < images.length; i += 2) {
        if (i + 1 < images.length) {
            // Pair of two images
            imagePairs.push([images[i], images[i + 1]]);
        } else {
            // Single image (last one if odd count)
            imagePairs.push([images[i]]);
        }
    }
    return imagePairs;
}

export const buildCommentTree = (comments: any[]): CommentType[] => {
    const map = new Map();
    const roots: CommentType[] = [];

    comments?.forEach(comment => {
        map.set(comment.id, { ...comment, replies: [] });
    });

    comments?.forEach(comment => {
        if (comment.parentId) {
            map.get(comment.parentId)?.replies.push(map.get(comment.id));
        } else {
            roots.push(map.get(comment.id));
        }
    });

    return roots;
}

export const escapeHtml = (s: string): string => {
    return s.replace(
        /[&<>"]+/g,
        (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": '&#39;' })[c]!
    );
}

export const highlightTerm = (text: string, term: string): string => {
    if (!text) return text;
    const escapedTerm = term.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
    const re = new RegExp(`(${escapedTerm})`, "ig");
    return escapeHtml(text).replace(re, "<mark>$1</mark>");
}

export const sanitizeSearchTerm = (term: string) => {
    const cleaned = term.trim();

    if (cleaned.length === 0) return "";
    if (cleaned.length > 30) return cleaned.slice(0, 30);

    // whitelist allowed characters: letters, numbers, spaces, dash, apostrophe
    return cleaned.replace(/[^a-zA-Z0-9\s\-']/g, "");
}

export const formatStringToHtml = (text: string) => {
    if (!text) return "";

    // 1. Convert URLs to clickable <a> tags
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let formattedText = text.replace(urlRegex, (url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-background-blue-accent hover:text-background-green-accent underline">${url}</a>`;
    });

    // 2. Convert newlines (\n) to <br /> tags
    formattedText = formattedText.replace(/\n/g, '<br />');

    return formattedText;
}

export const formatDate = (date: string, locale: string) => {
    return new Date(date).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};