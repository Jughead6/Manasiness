import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ConfigLayout from "../../../shared/ui/layouts/config/ConfigLayout.jsx"
import { passwordFormFields } from "../config/passwordFormFields.jsx"
import { editPassword } from "../api/password.api.js"

function PasswordPage() {
    const navigate = useNavigate()

    async function handleSubmit(data) {
        try {
            await editPassword(data)
            toast.success("Password updated successfully")
            navigate("/dashboard")
        } catch {
            toast.error("Could not update password")
        }
    }

    function handleCancel() {
        navigate("/dashboard")
    }

    return (
        <ConfigLayout
            title="Password"
            subtitle="In this page you can manage you password"
            formFields={passwordFormFields}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            informationValues={{}}
        />
    )
}

export default PasswordPage