import { Navigate } from "react-router-dom"
import { useAuth } from "../../features/auth/context/useAuth.js"

function ProtectedRoute({ children }) {
    const { store, isLoading } = useAuth()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!store) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute