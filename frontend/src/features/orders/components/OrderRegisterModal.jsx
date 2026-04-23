import { useState, useEffect } from "react"
import DrawerPanel from "../../../shared/ui/modal/DrawerPanel.jsx"
import CreatorBanner from "../../../shared/ui/branding/CreatorBanner.jsx"
import RegisterSpaceForm from "../../../shared/ui/forms/RegisterSpaceForm.jsx"
import { getOrderFormFields } from "../config/orderFormFields.jsx"
import { getSupplierOptions } from "../api/orders.api.js"
import { mapSupplierOptions } from "../mappers/orders.mapper.js"
import { getProductOptions } from "../../products/api/products.api.js"
import { mapProductOptions } from "../../products/mappers/products.mapper.js"

function OrderRegisterModal({ onClose, onCreate, isSubmitting }) {
    const [productOptions, setProductOptions] = useState([])
    const [supplierOptions, setSupplierOptions] = useState([])
    const [isLoadingOptions, setIsLoadingOptions] = useState(true)
    const [helperMessage, setHelperMessage] = useState("")

    useEffect(() => {
        async function fetchOptions() {
            try {
                setIsLoadingOptions(true)
                const [suppliersResponse, productsResponse] = await Promise.all([
                    getSupplierOptions(),
                    getProductOptions()
                ])

                const nextSupplierOptions = mapSupplierOptions(suppliersResponse)
                const nextProductOptions = mapProductOptions(productsResponse)

                setSupplierOptions(nextSupplierOptions)
                setProductOptions(nextProductOptions)

                if (!nextSupplierOptions.length || !nextProductOptions.length) {
                    setHelperMessage("You need active products and suppliers before registering an order.")
                    return
                }

                setHelperMessage("")
            } catch {
                setSupplierOptions([])
                setProductOptions([])
                setHelperMessage("The form options could not be loaded.")
            } finally {
                setIsLoadingOptions(false)
            }
        }

        fetchOptions()
    }, [])

    const isDisabled = isLoadingOptions || isSubmitting || !supplierOptions.length || !productOptions.length

    return (
        <DrawerPanel onClose={onClose}>
            <RegisterSpaceForm
                fields={getOrderFormFields(supplierOptions, productOptions, isDisabled)}
                sectionLabel="Orders"
                title="Register your new order!"
                helperMessage={helperMessage || (isLoadingOptions ? "Loading options..." : "")}
                onCancel={onClose}
                onSubmit={onCreate}
                isSubmitting={isSubmitting || isLoadingOptions}
            />
            <div className="shared-drawer-banner-slot">
                <CreatorBanner />
            </div>
        </DrawerPanel>
    )
}

export default OrderRegisterModal
