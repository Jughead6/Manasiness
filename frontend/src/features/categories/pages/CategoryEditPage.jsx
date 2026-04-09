import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { editCategory, getCategoryById } from "../api/categories.api.js"
import { mapCategoryToEdit } from "../mappers/categories.mapper.js"
import { categoryEditFields } from "../config/categoryFormFields.jsx"
import EntityEditForm from "../../../shared/ui/forms/EntityEditForm.jsx"

function CategoryEditPage() {
    const [editValues, setEditValues] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchEditValues() {
            try {
                const response = await getCategoryById(id)
                setEditValues(mapCategoryToEdit(response))
            } catch (error) {
                console.log(error)
            }
        }
        fetchEditValues()
    }, [id])


    async function handleSubmit(data) {
        try {
            await editCategory(id, data)
            console.log('edited successfully')
            navigate(`/dashboard/categories/${id}`)
            toast.success("Category edited successfully")
        } catch (error) {
            console.log(error)
            toast.error("The category could not be edited")
        }
    }

    function handleCancel() {
        navigate(`/dashboard/categories/${id}`)
    }

    if (!editValues) return null

    return (
        <EntityEditForm
            fields={categoryEditFields}
            values={editValues}
            sectionLabel="Categories"
            title="Edit Category"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    )
}

export default CategoryEditPage