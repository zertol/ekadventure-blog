type MutateResult = {
    id: string;
    operation: string;
};

export type SanityMutateResult = {
    transactionId: string;
    results: MutateResult[];
};