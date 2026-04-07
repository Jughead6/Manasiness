import EntityEditForm from "../../../shared/ui/forms/EntityEditForm"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { editCategory, getCategoryById } from "../api/categories.api.js"
import { mapCategoryToEdit } from "../mappers/categories.mapper.js"
import { categoryEditFields } from "../config/categoryFormFields.jsx"

function CategoryEditPage() {
    const [editValues, setEditValues] = useState(null)
    const { id } = useParams()

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

    async function handleEditCategory(formData) {
        try {
            await editCategory(id, formData)
            console.log('edited successfully')
        } catch (error) {
            console.log(error)
        }
    }

    if (!editValues) return null

    return (
        <EntityEditForm
            fields={categoryEditFields}
            values={editValues}
            sectionLabel="Categories"
            title="Edit Category"
            onSubmit={handleEditCategory}
        />
    )
}

export default CategoryEditPage