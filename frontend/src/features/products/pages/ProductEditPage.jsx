import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import EntityEditForm from "../../../shared/ui/forms/EntityEditForm.jsx"
import { editProduct, getProductById } from "../api/products.api.js"
import { mapProductToEdit } from "../mappers/products.mapper.js"
import { getProductFormFields } from "../config/productFormFields.jsx"
import { mapCategoryOptions } from "../../categories/mappers/categories.mapper.js"
import { getCategoryOptions } from "../../categories/api/categories.api.js"

function ProductEditPage() {
    const [editValues, setEditValues] = useState(null)
    const [categoryOptions, setCategoryOptions] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        async function fetchEditValues() {
            try {
                const response = await getProductById(id)
                setEditValues(mapProductToEdit(response))
                const editOptions = await getCategoryOptions()
                setCategoryOptions(mapCategoryOptions(editOptions))
            } catch (error) {
                console.log(error)
            }
        }
        fetchEditValues()
    }, [id])

    async function handleSubmit(data) {
        try {
            await editProduct(id, data)
            console.log('edited successfully')
            navigate(`/dashboard/products/${id}`)
            toast.success("Product edited successfully")
        } catch (error) {
            console.log(error)
            toast.error("The product could not be edited")
        }
    }

    function handleCancel() {
        navigate(`/dashboard/products/${id}`)
    }

    if (!editValues) return null
    
    return (
        <EntityEditForm 
        fields={getProductFormFields(categoryOptions)} 
        values={editValues} 
        sectionLabel="Products" 
        title="Edit Product"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        />
    )
}

export default ProductEditPage