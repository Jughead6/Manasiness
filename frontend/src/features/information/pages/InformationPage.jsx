import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ConfigLayout from "../../../shared/ui/layouts/config/ConfigLayout.jsx"
import { informationFormFields } from "../config/informationFormFields.jsx"
import { getInformation, editInformation } from "../api/information.api.js"
import { useAuth } from "../../auth/context/useAuth.js"

function InformationPage() {
    const [informationValues, setInformationValues] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const { loadSession } = useAuth()

    useEffect(() => {
        async function fetchInformation() {
            try {
                setIsLoading(true)
                const information = await getInformation()
                setInformationValues(information)
            } catch {
                setInformationValues({})
            } finally {
                setIsLoading(false)
            }
        }

        fetchInformation()
    }, [])

    async function handleSubmit(data) {
        try {
            setIsSubmitting(true)
            const response = await editInformation(data)
            const updatedInformation = response?.information ?? data

            setInformationValues(updatedInformation)
            await loadSession()
            toast.success("Information updated successfully")
        } catch {
            toast.error("Could not update information")
        } finally {
            setIsSubmitting(false)
        }
    }
    
    function handleCancel() {
        navigate("/dashboard")
    }

    return (
        <ConfigLayout
            title="Information"
            subtitle="On this page you can manage your store information."
            formFields={informationFormFields}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            informationValues={informationValues}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
        />
    )
}

export default InformationPage
