import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import EntityTitle from "../../../shared/ui/titles/entity/EntityTitle.jsx"
import EntityLayout from "../../../shared/ui/layouts/entity/EntityLayout.jsx"
import { deactivateProduct, getProductById } from "../api/products.api.js"
import { mapProductToDetail } from "../mappers/products.mapper.js"
import ProductDeactivationModal from "../components/ProductDeactivationModal.jsx"

function ProductDetailPage() {
    const { id } = useParams()
    const [detail, setDetail] = useState(null)
    const [isDeactivationOpen, setIsDeactivationOpen] = useState(false)

    useEffect(() => {
        async function fetchProductDetail() {
            try {
                const data = await getProductById(id)
                setDetail(mapProductToDetail(data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchProductDetail()
    }, [id])

    async function handleDeactivate() {
        try {
            await deactivateProduct(id)
            const data = await getProductById(id)
            setDetail(mapProductToDetail(data))
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
                entity="Product" 
                idx={id}
            />
            <EntityLayout 
                detail={detail} 
                onDeactivateClick={() => setIsDeactivationOpen(true)}
            />
            {isDeactivationOpen && <ProductDeactivationModal
                onClose={() => setIsDeactivationOpen(false)}
                onConfirm={handleDeactivate}
            />}
        </>
    )
}

export default ProductDetailPage
