export function getSaleFormFields(customerOptions = [], productOptions = [], isDisabled = false) {
    return [
        {
            label: "Product",
            placeholder: "Select a product",
            id: "sale-product",
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
            label: "Customer",
            placeholder: "Select a customer",
            id: "sale-customer",
            name: "user_id",
            options: [
                { value: "", label: "Select a customer", disabled: true },
                ...customerOptions
            ],
            required: true,
            defaultValue: "",
            disabled: isDisabled
        },
        {
            label: "Quantity",
            placeholder: "Write the quantity",
            id: "sale-quantity",
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
            id: "sale-state",
            name: "state",
            options: [
                { value: "", label: "Select a state", disabled: true },
                { value: "pending", label: "Pending", disabledWhen: (formValues) => customerOptions.some((item) => item.value === formValues.user_id && item.isDefault), disabledLabel: "Cash sale must be paid" },
                { value: "paid", label: "Paid" }
            ],
            required: true,
            defaultValue: "",
            disabled: isDisabled
        }
    ]
}
