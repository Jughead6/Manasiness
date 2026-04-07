import EntityEditForm from "../../../shared/ui/forms/EntityEditForm";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { editUser, getUserById } from "../api/users.api.js";
import { mapUserToEdit } from "../mappers/users.mapper.js";

import { userEditFields } from "../config/userFormFields";



function UserEditPage() {
    const [editValues, setEditValues] = useState(null)
    const { id } = useParams()
    
    useEffect(() => {
        async function fetchEditValues() {
            try {
                const response = await getUserById(id)
                setEditValues(mapUserToEdit(response))
            } catch (error) {
                console.log(error)
            }
        }

        fetchEditValues()
    }, [id])

    async function handleEditUser(formData) {
        try {
            await editUser(id, formData)
            console.log('edited successfully')
        } catch (error) {
            console.log(error)
        }
    }

    if (!editValues) return null
    
    return (
        <EntityEditForm 
        fields={userEditFields} 
        values={editValues} 
        sectionLabel="Users" 
        title="Edit User"
        onSubmit={handleEditUser}
        />
    )
}

export default UserEditPage