import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import EntityEditForm from "../../../shared/ui/forms/EntityEditForm.jsx"
import { editProduct, getProductById } from "../api/products.api.js"
import { mapProductToEdit } from "../mappers/products.mapper.js"
import { getProductEditFields } from "../config/productFormFields.jsx"
import { mapCategoryOptions } from "../../categories/mappers/categories.mapper.js"
import { getCategoryOptions } from "../../categories/api/categories.api.js"

function getSafeCategoryOptions(product, categoryOptions) {
    const currentCategoryId = String(product.category_id ?? '')
    const hasCurrentCategory = categoryOptions.some((option) => option.value === currentCategoryId)

    if (hasCurrentCategory || !currentCategoryId) {
        return categoryOptions
    }

    return [
        { value: currentCategoryId, label: product.category || 'Current category' },
        ...categoryOptions
    ]
}

function ProductEditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const [editValues, setEditValues] = useState(null)
    const [categoryOptions, setCategoryOptions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    
    useEffect(() => {
        async function fetchEditValues() {
            try {
                setIsLoading(true)
                setHasError(false)
                const [productResponse, categoryResponse] = await Promise.all([
                    getProductById(id),
                    getCategoryOptions()
                ])

                const mappedProduct = mapProductToEdit(productResponse)
                const mappedOptions = mapCategoryOptions(categoryResponse)
                const safeOptions = getSafeCategoryOptions(productResponse, mappedOptions)

                setEditValues(mappedProduct)
                setCategoryOptions(safeOptions)
            } catch {
                setEditValues(null)
                setCategoryOptions([])
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchEditValues()
    }, [id])

    async function handleSubmit(data) {
        try {
            await editProduct(id, data)
            navigate(`/dashboard/products/${id}`)
            toast.success("Product edited successfully")
        } catch {
            toast.error("The product could not be edited")
        }
    }

    function handleCancel() {
        navigate(`/dashboard/products/${id}`)
    }

    if (hasError || !editValues && !isLoading) {
        return (
            <div>
                <h2>Could not load product</h2>
                <button onClick={() => navigate("/dashboard/products")}>Back</button>
            </div>
        )
    }
    
    return (
        <EntityEditForm
            fields={getProductEditFields(categoryOptions)}
            values={editValues || {}}
            sectionLabel="Products"
            title="Edit Product"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
        />
    )
}

export default ProductEditPage
