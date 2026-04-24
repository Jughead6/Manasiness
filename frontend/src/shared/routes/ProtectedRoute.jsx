import { Navigate } from "react-router-dom"
import { useAuth } from "../../features/auth/context/useAuth.js"
import LoadingOverlay from "../ui/modal/LoadingOverlay.jsx"

function ProtectedRoute({ children }) {
    const { store, isLoading } = useAuth()

    if (isLoading) {
        return <LoadingOverlay/>
    }

    if (!store) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute