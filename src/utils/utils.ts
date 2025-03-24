export function ceilTo(value: number, decimals: number): number {
    const factor = 10 ** decimals;
    return Math.ceil(value * factor) / factor;
}