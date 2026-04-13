import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { editUser, getUserById } from "../api/users.api.js"
import { mapUserToEdit } from "../mappers/users.mapper.js"
import { userEditFields } from "../config/userFormFields.jsx"
import EntityEditForm from "../../../shared/ui/forms/EntityEditForm.jsx"

function UserEditPage() {
    const [editValues, setEditValues] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        async function fetchEditValues() {
            try {
                const response = await getUserById(id)
                setEditValues(mapUserToEdit(response))
            } catch {
                setEditValues(null)
            }
        }
        fetchEditValues()
    }, [id])

    async function handleSubmit(formData) {
        try {
            await editUser(id, formData)
            console.log('edited successfully')
            navigate(`/dashboard/users/${id}`)
            toast.success("User edited successfully")
        } catch {
            toast.error("The user could not be edited")
        }
    }

    function handleCancel() {
        navigate(`/dashboard/users/${id}`)
    }

    if (!editValues) return null
    
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