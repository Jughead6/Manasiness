export function getStaffFormFields(workerOptions = [], isDisabled = false) {
    return [
        {
            label: "Worker",
            placeholder: "Select a worker",
            id: "staff-worker",
            name: "user_id",
            options: [
                { value: "", label: "Select a worker", disabled: true },
                ...workerOptions
            ],
            required: true,
            defaultValue: "",
            disabled: isDisabled
        },
        {
            label: "Salary",
            placeholder: "Write the salary",
            id: "staff-salary",
            name: "salary",
            type: "number",
            required: true,
            min: 0.01,
            step: 0.01,
            inputMode: "decimal",
            disabled: isDisabled
        },
        {
            label: "State",
            placeholder: "Select a state",
            id: "staff-state",
            name: "state",
            options: [
                { value: "", label: "Select a state", disabled: true },
                { value: "pending", label: "Pending", disabledWhen: (formValues) => workerOptions.some((item) => item.value === formValues.user_id && item.isDefault), disabledLabel: "Cash payment must be paid" },
                { value: "paid", label: "Paid" }
            ],
            required: true,
            defaultValue: "",
            disabled: isDisabled
        }
    ]
}
