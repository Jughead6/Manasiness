import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { editCategory, getCategoryById } from "../api/categories.api.js"
import { mapCategoryToEdit } from "../mappers/categories.mapper.js"
import { categoryEditFields } from "../config/categoryFormFields.jsx"
import EntityEditForm from "../../../shared/ui/forms/EntityEditForm.jsx"

function CategoryEditPage() {
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
                const response = await getCategoryById(id)
                setEditValues(mapCategoryToEdit(response))
            } catch {
                setEditValues(null)
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }
        fetchEditValues()
    }, [id])


    async function handleSubmit(data) {
        try {
            await editCategory(id, data)
            navigate(`/dashboard/categories/${id}`)
            toast.success("Category edited successfully")
        } catch {
            toast.error("The category could not be edited")
        }
    }

    function handleCancel() {
        navigate(`/dashboard/categories/${id}`)
    }

    if (hasError || !editValues && !isLoading) {
        return (
            <div>
                <h2>Could not load category</h2>
                <button onClick={() => navigate("/dashboard/categories")}>Back</button>
            </div>
        )
    }

    return (
        <EntityEditForm
            fields={categoryEditFields}
            values={editValues || {}}
            sectionLabel="Categories"
            title="Edit Category"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
        />
    )
}

export default CategoryEditPage
