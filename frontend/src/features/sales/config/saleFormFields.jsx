export function getSaleFormFields(customerOptions = [], productOptions = []) {
    return [
    {
        label: 'Product',
        placeholder: 'Write the product id',
        id: 'sale-product',
        name: 'product_id',
        options: [
            { value: '', label: 'Selection a product', disabled: true },
            ...productOptions
        ],
        required: true
    },
    {
        label: 'Customer',
        placeholder: 'Write the user id',
        id: 'sale-customer',
        name: 'user_id',
        options: [
            { value: '', label: 'Selection a customer', disabled: true },
            ...customerOptions
        ],
        required: true
    },
    {
        label: 'Quantity',
        placeholder: 'Write the quantity',
        id: 'sale-quantity',
        name: 'quantity',
        type: 'text',
        required: true
    },                          
    {
        label: 'State',
        placeholder: 'Write the state',
        id: 'sale-state',
        name: 'state',
        options: [
            { value: '', label: 'Selection a state', disabled: true },
            { value: 'pending', label: 'Pending'},
            { value: 'paid', label: 'Paid'}
        ],
        required: true

    }
]}