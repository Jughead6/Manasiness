import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ConfigLayout from "../../../shared/ui/layouts/config/ConfigLayout.jsx"
import { passwordFormFields } from "../config/passwordFormFields.jsx"
import { editPassword } from "../api/password.api.js"

function PasswordPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formKey, setFormKey] = useState(0)
    const navigate = useNavigate()

    async function handleSubmit(data) {
        if (data.newPassword !== data.repeatPassword) {
            toast.error("Passwords do not match")
            return
        }

        try {
            setIsSubmitting(true)
            await editPassword(data)
            toast.success("Password updated successfully")
            setFormKey((prev) => prev + 1)
        } catch {
            toast.error("Could not update password")
        } finally {
            setIsSubmitting(false)
        }
    }

    function handleCancel() {
        navigate("/dashboard")
    }

    return (
        <ConfigLayout
            key={formKey}
            title="Password"
            subtitle="On this page you can update your password."
            formFields={passwordFormFields}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            informationValues={{}}
            isLoading={false}
            isSubmitting={isSubmitting}
        />
    )
}

export default PasswordPage
