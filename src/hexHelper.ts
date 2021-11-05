export function getAllMatches(text: string) {
    const regex = /0x[0-9a-fA-F](_?[0-9a-fA-F])*/g;
    let match;
    const result = [];
    while ((match = regex.exec(text)) !== null) {
        result.push(match);
    }
    return result;
}