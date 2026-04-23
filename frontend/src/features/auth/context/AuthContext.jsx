import { useEffect, useState } from "react"
import { getSession, logout } from "../api/auth.api.js"
import AuthContext from "./AuthContextInstance.js"

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
            setIsLoading(false)
            return
        }

        setStore(null)
        setIsLoading(false)
    }

    useEffect(() => {
        loadSession()
    }, [])

    return <AuthContext.Provider value={{ store, isLoading, loadSession, loginSession, logoutSession }}>{children}</AuthContext.Provider>
}
