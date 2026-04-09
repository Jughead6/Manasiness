import { useEffect, useState } from "react"
import ModalOverlay from "../../../shared/ui/modal/ModalOverlay.jsx"
import EntityForm from "../../../shared/ui/forms/EntityForm.jsx"
import CreatorBanner from "../../../shared/ui/branding/CreatorBanner.jsx"
import { getProductFormFields } from "../config/productFormFields.jsx"
import { mapCategoryOptions } from "../../categories/mappers/categories.mapper.js"
import { getCategoryOptions } from "../../categories/api/categories.api.js"

function ProductCreateModal({ onClose, onCreate }) {
    const [categoryOptions, setCategoryOptions] = useState([])

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await getCategoryOptions()
                setCategoryOptions(mapCategoryOptions(response))
            } catch (error) {
            console.log(error)
            } 
        }

        fetchCategories()
    }, [])

    return (
        <ModalOverlay onClose={onClose}>
            <>
                <EntityForm
                    sectionLabel="Products"
                    title="Create Your Product"
                    fields={getProductFormFields(categoryOptions)}
                    onCancel={onClose}
                    onSubmit={onCreate}
                />
                <CreatorBanner />
            </>
        </ModalOverlay>
    )
}

export default ProductCreateModal