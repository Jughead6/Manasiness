import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ConfigLayout from "../../../shared/ui/layouts/config/ConfigLayout.jsx"
import { informationFormFields } from "../config/informationFormFields.jsx"
import { getInformation, editInformation } from "../api/information.api.js"

function InformationPage() {
    const [informationValues, setInformationValues] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchInformation() {
            try {
                const information = await getInformation()
                setInformationValues(information)
            } catch {
                setInformationValues({})
            }

        }
        fetchInformation()
    }, [])

    async function handleSubmit(data) {
        try {
            await editInformation(data)
            toast.success("Information updated successfully")
            navigate(`/dashboard`)
            
        } catch {
            toast.error("Could not update information")
        }
    }
    
    function handleCancel() {
        navigate("/dashboard")
    }

    return (
        <ConfigLayout
            title="Information"
            subtitle="In this page you can manage you information personal"
            formFields={informationFormFields}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            informationValues={informationValues}
        />
    )
}

export default InformationPage