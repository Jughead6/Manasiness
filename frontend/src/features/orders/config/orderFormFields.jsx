export function getOrderFormFields(supplierOptions = [], productOptions = [], isDisabled = false) {
    return [
        {
            label: "Product",
            placeholder: "Select a product",
            id: "order-product",
            name: "product_id",
            options: [
                { value: "", label: "Select a product", disabled: true },
                ...productOptions
            ],
            required: true,
            defaultValue: "",
            disabled: isDisabled
        },
        {
            label: "Supplier",
            placeholder: "Select a supplier",
            id: "order-supplier",
            name: "user_id",
            options: [
                { value: "", label: "Select a supplier", disabled: true },
                ...supplierOptions
            ],
            required: true,
            defaultValue: "",
            disabled: isDisabled
        },
        {
            label: "Quantity",
            placeholder: "Write the quantity",
            id: "order-quantity",
            name: "quantity",
            type: "number",
            required: true,
            min: 1,
            step: 1,
            inputMode: "numeric",
            disabled: isDisabled
        },
        {
            label: "State",
            placeholder: "Select a state",
            id: "order-state",
            name: "state",
            options: [
                { value: "", label: "Select a state", disabled: true },
                { value: "pending", label: "Pending" },
                { value: "paid", label: "Paid" }
            ],
            required: true,
            defaultValue: "",
            disabled: isDisabled
        }
    ]
}
