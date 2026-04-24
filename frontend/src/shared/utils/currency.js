export const CURRENCY_OPTIONS = [
    { value: "PEN", label: "PEN - Sol peruano", symbol: "S/", locale: "es-PE" },
    { value: "USD", label: "USD - US Dollar", symbol: "$", locale: "en-US" },
    { value: "EUR", label: "EUR - Euro", symbol: "€", locale: "es-ES" },
    { value: "MXN", label: "MXN - Mexican Peso", symbol: "$", locale: "es-MX" },
    { value: "COP", label: "COP - Colombian Peso", symbol: "$", locale: "es-CO" },
    { value: "CLP", label: "CLP - Chilean Peso", symbol: "$", locale: "es-CL" },
    { value: "ARS", label: "ARS - Argentine Peso", symbol: "$", locale: "es-AR" },
    { value: "BRL", label: "BRL - Brazilian Real", symbol: "R$", locale: "pt-BR" }
]

export function getCurrencyByCode(code = "PEN") {
    return CURRENCY_OPTIONS.find((item) => item.value === code) || CURRENCY_OPTIONS[0]
}

export function formatCurrency(value, currencyCode = "PEN") {
    const currency = getCurrencyByCode(currencyCode)
    const parsed = Number(value ?? 0)
    const safeValue = Number.isFinite(parsed) ? parsed : 0

    try {
        return new Intl.NumberFormat(currency.locale, {
            style: "currency",
            currency: currency.value,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(safeValue)
    } catch {
        return `${currency.symbol} ${safeValue.toFixed(2)}`
    }
}
