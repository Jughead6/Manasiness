import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import EntityTitle from "../../../shared/ui/titles/entity/EntityTitle.jsx"
import EntityLayout from "../../../shared/ui/layouts/entity/EntityLayout.jsx"
import { deactivateCategory, getCategoryById } from "../api/categories.api.js"
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
            } catch (error) {
                console.log(error)
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
        } catch (error) {
            console.log(error)
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
            />
            {isDeactivationOpen && <CategoryDeactivationModal
                onClose={() => setIsDeactivationOpen(false)}
                onConfirm={handleDeactivate}
            />}
        </>
    )
}

export default CategoryDetailPage
