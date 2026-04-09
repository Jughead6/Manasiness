import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import EntityTitle from "../../../shared/ui/titles/entity/EntityTitle.jsx"
import EntityLayout from "../../../shared/ui/layouts/entity/EntityLayout.jsx"
import { activateProduct, deactivateProduct, getProductById } from "../api/products.api.js"
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
            toast.success("Product successfully deactivated")
        } catch (error) {
            console.log(error)
            toast.error("The product could not be deactivated")
        }
    }

    async function handleActivate() {
        try {
            await activateProduct(id)
            const data = await getProductById(id)
            setDetail(mapProductToDetail(data))
            toast.success("Product successfully activated")
        } catch (error) {
            console.log(error)
            toast.error("The product could not be activated")
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
                onActivateClick={handleActivate}
            />
            {isDeactivationOpen && <ProductDeactivationModal
                onClose={() => setIsDeactivationOpen(false)}
                onConfirm={handleDeactivate}
            />}
        </>
    )
}

export default ProductDetailPage