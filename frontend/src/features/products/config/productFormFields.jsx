export function getProductFormFields(categoryOptions = []) {
    return [
        {
            label: 'Name',
            placeholder: 'Write the name product',
            id: 'product-name',
            name: 'name',
            type: 'text',
            required: true
        },
        {
            label: 'Category',
            placeholder: 'Write the category id',
            id: 'product-category',
            name: 'category_id',
            options: [
                { value: '', label: 'Select a category', disabled: true },
                ...categoryOptions
            ],
            required: true
        },
        {
            label: 'Image',
            placeholder: 'Write the image URL',
            name: 'image',
            id: 'product-image',
            type: 'text'
        },
        {
            label: 'Cost Price',
            placeholder: 'Write the cost price',
            name: 'cost_price',
            id: 'product-cost-price',
            type: 'number',
            required: true
        },
        {
            label: 'Sale Price',
            placeholder: 'Write the sale price',
            name: 'sale_price',
            id: 'product-sale-price',
            type: 'number',
            required: true
        },
        {
            label: 'Stock Product',
            placeholder: 'Write the stock amount',
            name: 'stock',
            id: 'product-stock',
            type: 'number',
            required: true
        }
    ]
}

export function getProductEditFields(categoryOptions = []) {
    return [
        {
            label: 'Name',
            placeholder: 'Write the name product',
            id: 'product-name',
            name: 'name',
            type: 'text',
            required: true
        },
        {
            label: 'Category',
            id: 'product-category',
            name: 'category_id',
            options: [
                { value: '', label: 'Select a category', disabled: true },
                ...categoryOptions
            ],
            required: true
        },
        {
            label: 'Image',
            placeholder: 'Write the image URL',
            id: 'product-image',
            name: 'image',
            type: 'text'
        },
        {
            label: 'Cost Price',
            placeholder: 'Write the cost price',
            id: 'product-cost-price',
            name: 'cost_price',
            type: 'number',
            required: true
        },
        {
            label: 'Sale Price',
            placeholder: 'Write the sale price',
            id: 'product-sale-price',
            name: 'sale_price',
            type: 'number',
            required: true
        },
        {
            label: 'Stock',
            placeholder: 'Write the stock amount',
            id: 'product-stock',
            name: 'stock',
            type: 'number',
            required: true
        }
    ]
}
