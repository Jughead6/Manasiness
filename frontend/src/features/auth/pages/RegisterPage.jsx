import AuthOverlay from '../../../shared/ui/modal/AuthOverlay.jsx'
import AuthLayout from '../../../shared/ui/layouts/auth/AuthLayout.jsx'
import RegisterForm from '../../../shared/ui/forms/RegisterForm.jsx'
import { useNavigate } from "react-router-dom"
import { register } from '../api/auth.api.js'
import { toast } from "react-toastify"


function RegisterPage() {
    const navigate = useNavigate()

    async function handleRegister(data) {
        try {
            await register(data)
            toast.success("Register Successful!")
            navigate("/login")
        } catch (error) {
            toast.error(error.message || "Could not register")
        }
    }

    return (
        <AuthOverlay>
            <AuthLayout>
                <RegisterForm onRegister={handleRegister} />
            </AuthLayout>
        </AuthOverlay>
    )
}

export default RegisterPage