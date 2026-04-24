import { formatCurrency } from "../../../shared/utils/currency.js"

export function mapProductsToCards(data, currencyCode = "PEN") {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        status: item.is_active ? "Active" : "Inactive",
        details: [
            `Category: ${item.category}`,
            `Cost Price: ${formatCurrency(item.cost_price, currencyCode)}`,
            `Sale Price: ${formatCurrency(item.sale_price, currencyCode)}`,
            `Stock: ${item.stock}`
        ]
    }))
}

export function mapProductToDetail(item, currencyCode = "PEN") {
    return {
        id: item.id,
        name: item.name,
        image: item.image,
        isActive: item.is_active,
        details: [
            { label: "Category", value: item.category },
            { label: "Cost Price", value: formatCurrency(item.cost_price, currencyCode) },
            { label: "Sale Price", value: formatCurrency(item.sale_price, currencyCode) },
            { label: "Stock", value: item.stock },
            { label: "Created At", value: item.created_at },
            { label: "Updated At", value: item.updated_at || "No updates yet" },
            { label: "Active", value: item.is_active ? "Yes" : "No" }
        ]
    }
}

export function mapProductToEdit(item) {
    return {
        id: item.id,
        name: item.name,
        image: item.image,
        category_id: String(item.category_id ?? ''),
        cost_price: item.cost_price,
        sale_price: item.sale_price,
        stock: item.stock,
    }
}

export function mapProductOptions(data) {
    return data.map((item) => ({
        value: String(item.id),
        label: item.name
    }))
}
