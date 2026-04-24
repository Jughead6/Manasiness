import AuthOverlay from "../../../shared/ui/modal/AuthOverlay.jsx"
import AuthLayout from "../../../shared/ui/layouts/auth/AuthLayout.jsx"
import ForgotPasswordForm from "../../../shared/ui/forms/ForgotPasswordForm.jsx"
import { useNavigate } from "react-router-dom"
import { resetPassword, sendPasswordResetCode, verifyPasswordResetCode } from "../api/auth.api.js"
import { toast } from "react-toastify"

function ForgotPasswordPage() {
    const navigate = useNavigate()

    async function handleSendCode(data) {
        await sendPasswordResetCode(data)
        toast.success("If the account exists, the code was sent")
    }

    async function handleVerifyCode(data) {
        await verifyPasswordResetCode(data)
        toast.success("Code verified")
    }

    async function handleResetPassword(data) {
        await resetPassword(data)
        toast.success("Password updated successfully")
        navigate("/login", { replace: true })
    }

    return (
        <AuthOverlay>
            <AuthLayout>
                <ForgotPasswordForm onSendCode={handleSendCode} onVerifyCode={handleVerifyCode} onResetPassword={handleResetPassword} />
            </AuthLayout>
        </AuthOverlay>
    )
}

export default ForgotPasswordPage
