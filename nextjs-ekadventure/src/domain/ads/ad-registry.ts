class AdRegistry {
    private initialized = new Set<string>();

    has(id: string) {
        return this.initialized.has(id);
    }

    mark(id: string) {
        this.initialized.add(id);
    }
};

export const adRegistry = new AdRegistry();