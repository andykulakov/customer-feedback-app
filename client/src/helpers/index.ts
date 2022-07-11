export function getArrayFromLength(length: number): number[] {
    return Array.from({length}, (v, i) => i + 1);
}
