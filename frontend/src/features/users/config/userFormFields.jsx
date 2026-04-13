export const userFormFields = [
    {
        label: 'Name',
        placeholder: 'Write user name',
        id: 'user-name',
        name: 'name',
        type: 'text',
        required: true
    },
    {
        label: 'Image',
        placeholder: 'Write image URL',
        id: 'user-image',
        name: 'image',
        type: 'text'
    },
    {
        label: 'Phone',
        placeholder: 'Write phone',
        id: 'user-phone',
        name: 'phone',
        type: 'text',
        required: true
    },
    {
        label: 'Role',
        id: 'user-role',
        name: 'role',
        options: [
            { value: 'supplier', label: 'Supplier' },
            { value: 'worker', label: 'Worker' },
            { value: 'customer', label: 'Customer' }
        ],
        required: true
    }
]   

export const userEditFields = [
    {
        label: 'Name',
        placeholder: 'Write user name',
        id: 'user-name',
        name: 'name',
        type: 'text',
        required: true
    },
    {
        label: 'Image',
        placeholder: 'Write image URL',
        id: 'user-image',
        name: 'image',
        type: 'text'
    },
    {
        label: 'Phone',
        placeholder: 'Write phone',
        id: 'user-phone',
        name: 'phone',
        type: 'text',
        required: true
    }
]