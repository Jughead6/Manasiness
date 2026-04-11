import AuthOverlay from '../../../shared/ui/modal/AuthOverlay'
import AuthLayout from '../../../shared/ui/layouts/auth/AuthLayout'
import { useNavigate, Navigate } from "react-router-dom"
import { login } from '../api/auth.api'
import { toast } from "react-toastify"
import LoginForm from '../../../shared/ui/forms/LoginForm'

function LoginPage() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    if (token) {
        return <Navigate to="/dashboard" replace></Navigate>
    }
    async function handleSubmit(data) {
        try {
            const store = await login(data)

            localStorage.setItem("token", store.token)
            localStorage.setItem("store", JSON.stringify(store.store))

            navigate("/dashboard")
            toast.success("Login successfull!")
        } catch {
            toast.error("Invalid Credentials")
        }
    }
    return (
        <AuthOverlay>
            <AuthLayout>
                <LoginForm onSubmit={handleSubmit} />
            </AuthLayout>
        </AuthOverlay>
    )
}

export default LoginPage