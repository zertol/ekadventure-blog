import { ISanityTranslator } from "./i-sanity-translator";
import { SanityMutateResult } from "../../types/sanity/sanity-mutate-result";

export class MutateResultTranslator implements ISanityTranslator<SanityMutateResult> {
    translateToSanityResult(jsonData: any): SanityMutateResult {
        return {
            transactionId: jsonData.transactionId,
            results: jsonData.results.map((result: any) => ({
                id: result.id,
                operation: result.operation,
            })),
        };
    }
}