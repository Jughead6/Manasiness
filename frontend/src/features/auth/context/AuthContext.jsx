import { createContext, useContext, useEffect, useState } from "react"
import { getSession, logout } from "../api/auth.api.js"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [store, setStore] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    async function loadSession() {
        try {
            setIsLoading(true)
            const response = await getSession()                                                             
            setStore(response.store)
        } catch {
            setStore(null)
        } finally {
            setIsLoading(false)
        }
    }

    async function loginSession() {
        await loadSession()
    }

    async function logoutSession() {
        try {
            await logout()
        } catch {
            setStore(null)
        }
        setStore(null)
        setIsLoading(false)
    }

    useEffect(() => {
        loadSession()
    }, [])

    return (
        <AuthContext.Provider value={{ store, isLoading, loginSession, logoutSession, loadSession }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("Auth context invalid")
    }

    return context
}