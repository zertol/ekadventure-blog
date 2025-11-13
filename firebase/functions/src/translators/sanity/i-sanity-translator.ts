export interface ISanityTranslator<T> {
    translateToSanityResult(jsonData: any): T;
}