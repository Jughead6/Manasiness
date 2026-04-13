import AuthOverlay from "../../../shared/ui/modal/AuthOverlay.jsx"
import AuthLayout from "../../../shared/ui/layouts/auth/AuthLayout.jsx"
import { useNavigate, Navigate } from "react-router-dom"
import { login } from "../api/auth.api"
import { useAuth } from "../context/AuthContext.jsx"
import { toast } from "react-toastify"
import LoginForm from "../../../shared/ui/forms/LoginForm"

function LoginPage() {
    const navigate = useNavigate()
    const { store, isLoading, loginSession } = useAuth()

    if (isLoading) {
        return null
    }

    if (store) {
        return <Navigate to="/dashboard" replace />
    }

    async function handleSubmit(data) {
        try {
            await login(data)
            await loginSession()
            navigate("/dashboard")
            toast.success("Login successful!")
        } catch {
            toast.error("Invalid credentials")
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