import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import EntityTitle from "../../../shared/ui/titles/entity/EntityTitle.jsx"
import EntityLayout from "../../../shared/ui/layouts/entity/EntityLayout.jsx"
import { activateCategory, deactivateCategory, getCategoryById } from "../api/categories.api.js"
import { mapCategoryToDetail } from "../mappers/categories.mapper.js"
import CategoryDeactivationModal from "../components/CategoryDeactivationModal.jsx"

function CategoryDetailPage() {
    const { id } = useParams()
    const [detail, setDetail] = useState(null)
    const [isDeactivationOpen, setIsDeactivationOpen] = useState(false)

    useEffect(() => {
        async function fetchCategoryDetail() {
            try {
                const data = await getCategoryById(id)
                setDetail(mapCategoryToDetail(data))
            } catch {
                setDetail(null)
            }
        }
        fetchCategoryDetail()
    }, [id])

    async function handleDeactivate() {
        try {
            await deactivateCategory(id)
            const data = await getCategoryById(id)
            setDetail(mapCategoryToDetail(data))
            setIsDeactivationOpen(false)
            toast.success("Category successfully deactivated")
        } catch {
            toast.error("The category could not be deactivated")
        }
    }

    async function handleActivate() {
        try {
            await activateCategory(id)
            const data = await getCategoryById(id)
            setDetail(mapCategoryToDetail(data))
            toast.success("Category successfully activated")
        } catch {
            toast.error("The category could not be activated")
        }
    }

    if (!detail) {
        return null
    }

    return (
        <>
            <EntityTitle 
                entity="Category" 
                idx={id}
            />
            <EntityLayout 
                detail={detail} 
                onDeactivateClick={() => setIsDeactivationOpen(true)}
                onActivateClick={handleActivate}
            />
            {isDeactivationOpen && <CategoryDeactivationModal
                onClose={() => setIsDeactivationOpen(false)}
                onConfirm={handleDeactivate}
            />}
        </>
    )
}

export default CategoryDetailPage