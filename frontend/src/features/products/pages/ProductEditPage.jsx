import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { editProduct, getProductById } from "../api/products.api.js"
import { mapProductToEdit } from "../mappers/products.mapper.js"
import { productEditFields } from "../config/productFormFields.jsx"
import EntityEditForm from "../../../shared/ui/forms/EntityEditForm.jsx"

function ProductEditPage() {
    const [editValues, setEditValues] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        async function fetchEditValues() {
            try {
                const response = await getProductById(id)
                setEditValues(mapProductToEdit(response))
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
        } catch (error) {
            console.log(error)
        }
    }

    function handleCancel() {
        navigate(`/dashboard/products/${id}`)
    }

    if (!editValues) return null
    
    return (
        <EntityEditForm 
        fields={productEditFields} 
        values={editValues} 
        sectionLabel="Products" 
        title="Edit Product"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        />
    )
}

export default ProductEditPage