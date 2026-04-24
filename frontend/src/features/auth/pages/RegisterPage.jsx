import AuthOverlay from "../../../shared/ui/modal/AuthOverlay.jsx"
import AuthLayout from "../../../shared/ui/layouts/auth/AuthLayout.jsx"
import RegisterForm from "../../../shared/ui/forms/RegisterForm.jsx"
import { useNavigate } from "react-router-dom"
import { register, sendRegisterCode, verifyRegisterCode } from "../api/auth.api.js"
import { toast } from "react-toastify"

function RegisterPage() {
    const navigate = useNavigate()

    async function handleSendCode(data) {
        await sendRegisterCode(data)
        toast.success("Code sent")
    }

    async function handleVerifyCode(data) {
        await verifyRegisterCode(data)
        toast.success("Code verified")
    }

    async function handleRegister(data) {
        try {
            await register(data)
            toast.success("Register successful!")
            navigate("/login")
        } catch (error) {
            toast.error(error.message || "Could not register")
        }
    }

    return (
        <AuthOverlay>
            <AuthLayout>
                <RegisterForm onRegister={handleRegister} onVerifyEmail={handleSendCode} onVerifyCode={handleVerifyCode} />
            </AuthLayout>
        </AuthOverlay>
    )
}

export default RegisterPage
