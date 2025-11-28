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
export const groupImagePairsOrSingle = (images: any[]) => {
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