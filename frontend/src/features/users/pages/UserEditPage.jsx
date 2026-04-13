import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { editUser, getUserById } from "../api/users.api.js"
import { mapUserToEdit } from "../mappers/users.mapper.js"
import { userEditFields } from "../config/userFormFields.jsx"
import EntityEditForm from "../../../shared/ui/forms/EntityEditForm.jsx"

function UserEditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const [editValues, setEditValues] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    
    useEffect(() => {
        async function fetchEditValues() {
            try {
                setIsLoading(true)
                setHasError(false)
                const response = await getUserById(id)
                setEditValues(mapUserToEdit(response))
            } catch {
                setEditValues(null)
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }
        fetchEditValues()
    }, [id])

    async function handleSubmit(formData) {
        try {
            await editUser(id, formData)
            navigate(`/dashboard/users/${id}`)
            toast.success("User edited successfully")
        } catch {
            toast.error("The user could not be edited")
        }
    }

    function handleCancel() {
        navigate(`/dashboard/users/${id}`)
    }

    if (isLoading) {
        return <div>Loading user...</div>
    }

    if (hasError || !editValues) {
        return (
            <div>
                <h2>Could not load user</h2>
                <button onClick={() => navigate("/dashboard/users")}>Back</button>
            </div>
        )
    }
    
    
    return (
        <EntityEditForm 
        fields={userEditFields} 
        values={editValues} 
        sectionLabel="Users" 
        title="Edit User"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        />
    )
}

export default UserEditPage