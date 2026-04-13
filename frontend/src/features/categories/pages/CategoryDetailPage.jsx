import { useParams, useNavigate  } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import EntityTitle from "../../../shared/ui/titles/entity/EntityTitle.jsx"
import EntityLayout from "../../../shared/ui/layouts/entity/EntityLayout.jsx"
import { activateCategory, deactivateCategory, getCategoryById } from "../api/categories.api.js"
import { mapCategoryToDetail } from "../mappers/categories.mapper.js"
import CategoryDeactivationModal from "../components/CategoryDeactivationModal.jsx"

function CategoryDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [detail, setDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [isDeactivationOpen, setIsDeactivationOpen] = useState(false)

    useEffect(() => {
        async function fetchCategoryDetail() {
            try {
                setIsLoading(true)
                setHasError(false)
                const data = await getCategoryById(id)
                setDetail(mapCategoryToDetail(data))
            } catch {
                setDetail(null)
                setHasError(true)
            } finally {
                setIsLoading(false)
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

    if (isLoading) {
        return <div>Loading category...</div>
    }

    if (hasError || !detail) {
        return (
            <div>
                <h2>Could not load category</h2>
                <button onClick={() => navigate("/dashboard/categories")}>Back</button>
            </div>
        )
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