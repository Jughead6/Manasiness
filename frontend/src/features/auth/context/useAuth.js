import { useContext } from "react"
import AuthContext from "./AuthContextInstance.js"

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("Auth context invalid")
    }

    return context
}
