export function getStaffFormFields(workerOptions = [])  {
    return [
    {
        label: 'Worker',
        placeholder: 'Write the user id',
        id: 'staff-worker',
        name: 'user_id',
        options: [
            { value: '', label: 'Selection a worker', disabled: true },
            ...workerOptions
        ],
        required: true
    },
        {
        label: 'Salary',
        placeholder: 'Write the salary',
        id: 'staff-salary',
        name: 'salary',
        type: 'text',
        required: true
    },
    {
        label: 'State',
        placeholder: 'Write the state',
        id: 'staff-state',
        name: 'state',
        options: [
            { value: 'pending', label: 'Pending'},
            { value: 'paid', label: 'Paid'}
        ],
        required: true
    }
]}