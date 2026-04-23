export const passwordFormFields = [
    {
        label: "Current Password",
        placeholder: "Write your current password",
        id: "password-current",
        name: "currentPassword",
        type: "password",
        required: true,
        autoComplete: "current-password"
    },
    {
        label: "New Password",
        placeholder: "Write your new password",
        id: "password-new",
        name: "newPassword",
        type: "password",
        required: true,
        minLength: 8,
        autoComplete: "new-password"
    },
    {
        label: "Repeat Password",
        placeholder: "Repeat your new password",
        id: "password-repeat",
        name: "repeatPassword",
        type: "password",
        required: true,
        minLength: 8,
        autoComplete: "new-password"
    }
]
