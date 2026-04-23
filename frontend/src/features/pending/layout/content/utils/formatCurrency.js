export function formatCurrency(value) {
    return `S/ ${Number(value ?? 0).toFixed(2)}`
}