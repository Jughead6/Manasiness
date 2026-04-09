export function getOrderFormFields(supplierOptions = [], productOptions = []) {
    return [
    {
        label: 'Product',
        id: 'order-product',
        name: 'product_id',
        options: [
            { value: '', label: 'Select a product', disabled: true },
            ...productOptions
        ],
        required: true,
        defaultValue: ''
    },
    {
        label: 'Supplier',
        placeholder: 'Write the supplier id',
        id: 'order-supplier',
        name: 'user_id',
        options: [
            { value: '', label: 'Selection a supplier', disabled: true },
            ...supplierOptions
        ],
        required: true
    },
    {
        label: 'Quantity',
        placeholder: 'Write the quantity',
        id: 'order-quantity',
        name: 'quantity',
        type: 'text',
        required: true
    },
    {
        label: 'State',
        placeholder: 'Write the state',
        id: 'order-state',
        name: 'state',
        options: [
            { value: 'pending', label: 'Pending'},
            { value: 'paid', label: 'Paid'}
        ],
        required: true
    }
]}

