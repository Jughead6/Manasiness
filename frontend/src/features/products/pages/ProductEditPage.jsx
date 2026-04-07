import EntityEditForm from "../../../shared/ui/forms/EntityEditForm";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { editProduct, getProductById } from "../api/products.api.js";
import { mapProductToEdit } from "../mappers/products.mapper.js";

import { productEditFields } from "../config/productFormFields";

function ProductEditPage() {
    const [editValues, setEditValues] = useState(null)
    const { id } = useParams()
    
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

    async function handleEditProduct(formData) {
        try {
            await editProduct(id, formData)
            console.log('edited successfully')
        } catch (error) {
            console.log(error)
        }
    }

    if (!editValues) return null
    
    return (
            <EntityEditForm 
            fields={productEditFields} 
            values={editValues} 
            sectionLabel="Products" 
            title="Edit Product"
            onSubmit={handleEditProduct}
        />
    )
}

export default ProductEditPage