export const ParsePrice = (priceText: string): number => {
    return Number(priceText.replace(/[^\d]/g, ""))
}
export const ParseSold = (soldText: string): number => {
    const lower = soldText.toLowerCase();
    const num = parseFloat(lower.replace(/[^\d.,]/g, "").replace(",", "."));

    if (lower.includes("rb")) return Math.round(num * 1_000);
    if (lower.includes("jt")) return Math.round(num * 1_000_000);

    return Math.round(num);
}