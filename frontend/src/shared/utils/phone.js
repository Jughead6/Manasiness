export const PHONE_COUNTRY_OPTIONS = [
    { value: "+51", label: "Peru", digits: 9, groups: [3, 3, 3], placeholder: "999 999 999" },
    { value: "+1", label: "United States", digits: 10, groups: [3, 3, 4], placeholder: "555 123 4567" },
    { value: "+34", label: "Spain", digits: 9, groups: [3, 3, 3], placeholder: "600 000 000" },
    { value: "+52", label: "Mexico", digits: 10, groups: [3, 3, 4], placeholder: "555 123 4567" },
    { value: "+57", label: "Colombia", digits: 10, groups: [3, 3, 4], placeholder: "300 123 4567" },
    { value: "+56", label: "Chile", digits: 9, groups: [1, 4, 4], placeholder: "9 1234 5678" },
    { value: "+54", label: "Argentina", digits: 10, groups: [2, 4, 4], placeholder: "11 2345 6789" },
    { value: "+55", label: "Brazil", digits: 11, groups: [2, 5, 4], placeholder: "11 91234 5678" }
]

export function getPhoneCountry(value = "+51") {
    const parsed = String(value || "")
    const country = [...PHONE_COUNTRY_OPTIONS].sort((a, b) => b.value.length - a.value.length).find((item) => parsed.startsWith(item.value) || parsed === item.value)

    return country || PHONE_COUNTRY_OPTIONS[0]
}

export function getOnlyDigits(value = "") {
    return String(value || "").replace(/\D/g, "")
}

export function getPhoneDigits(value = "", countryValue) {
    const country = getPhoneCountry(countryValue || value)
    const cleanValue = String(value || "").replace(/\s/g, "")

    if (cleanValue.startsWith(country.value)) {
        return getOnlyDigits(cleanValue.slice(country.value.length)).slice(0, country.digits)
    }

    if (cleanValue.startsWith("+")) {
        return getOnlyDigits(cleanValue.slice(country.value.length)).slice(0, country.digits)
    }

    return getOnlyDigits(cleanValue).slice(0, country.digits)
}

export function formatPhoneDigits(value = "", country = PHONE_COUNTRY_OPTIONS[0]) {
    const digits = getOnlyDigits(value).slice(0, country.digits)
    const parts = []
    let start = 0

    country.groups.forEach((size) => {
        const part = digits.slice(start, start + size)

        if (part) {
            parts.push(part)
        }

        start += size
    })

    return parts.join(" ")
}

export function buildPhoneValue(countryValue = "+51", value = "") {
    const country = getPhoneCountry(countryValue)
    const digits = getOnlyDigits(value).slice(0, country.digits)

    if (!digits) {
        return ""
    }

    return `${country.value}${digits}`
}

export function formatPhone(value = "") {
    if (!value) {
        return "No phone"
    }

    const country = getPhoneCountry(value)
    const digits = getPhoneDigits(value, country.value)
    const formatted = formatPhoneDigits(digits, country)

    return formatted ? `${country.value} ${formatted}` : value
}
