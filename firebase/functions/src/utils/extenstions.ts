export const formatString = (input: string, ...replacements: string[]) => {
    const args = replacements;
    return input.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != "undefined" ? args[number] : match;
    });
};