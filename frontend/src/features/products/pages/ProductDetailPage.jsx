import { useParams, useNavigate  } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import EntityTitle from "../../../shared/ui/titles/entity/EntityTitle.jsx"
import EntityLayout from "../../../shared/ui/layouts/entity/EntityLayout.jsx"
import { activateProduct, deactivateProduct, getProductById } from "../api/products.api.js"
import { mapProductToDetail } from "../mappers/products.mapper.js"
import ProductDeactivationModal from "../components/ProductDeactivationModal.jsx"
import { useAuth } from "../../auth/context/useAuth.js"

function ProductDetailPage() {
    const { store } = useAuth()
    const currencyCode = store?.currency_code || "PEN"
    const { id } = useParams()
    const navigate = useNavigate()

    const [detail, setDetail] = useState(null)
    const [hasError, setHasError] = useState(false)
    const [isDeactivationOpen, setIsDeactivationOpen] = useState(false)

    useEffect(() => {
        async function fetchProductDetail() {
            try {
                setHasError(false)
                const data = await getProductById(id)
                setDetail(mapProductToDetail(data, currencyCode))
            } catch {
                setDetail(null)
                setHasError(true)
            }
        }
        fetchProductDetail()
    }, [id, currencyCode])

    async function handleDeactivate() {
        try {
            await deactivateProduct(id)
            const data = await getProductById(id)
            setDetail(mapProductToDetail(data, currencyCode))
            setIsDeactivationOpen(false)
            toast.success("Product successfully deactivated")
        } catch {
            toast.error("The product could not be deactivated")
        }
    }

    async function handleActivate() {
        try {
            await activateProduct(id)
            const data = await getProductById(id)
            setDetail(mapProductToDetail(data, currencyCode))
            toast.success("Product successfully activated")
        } catch {
            toast.error("The product could not be activated")
        }
    }

    if (hasError || !detail) {
        return (
            <div>
                <h2>Could not load product</h2>
                <button onClick={() => navigate("/dashboard/products")}>Back</button>
            </div>
        )
    }

    return (
        <>
            <EntityLayout 
                entity="Product" 
                idx={id}
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