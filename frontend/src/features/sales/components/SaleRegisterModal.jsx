import { useState, useEffect } from "react"
import DrawerPanel from "../../../shared/ui/modal/DrawerPanel.jsx"
import CreatorBanner from "../../../shared/ui/branding/CreatorBanner.jsx"
import RegisterSpaceForm from "../../../shared/ui/forms/RegisterSpaceForm.jsx"
import { getSaleFormFields } from "../config/saleFormFields.jsx"
import { getCustomerOptions } from "../api/sales.api.js"
import { mapCustomerOptions } from "../mappers/sales.mapper.js"
import { getProductOptions } from "../../products/api/products.api.js"
import { mapProductOptions } from "../../products/mappers/products.mapper.js"

function SaleRegisterModal({ onClose, onCreate, isSubmitting }) {
    const [customerOptions, setCustomerOptions] = useState([])
    const [productOptions, setProductOptions] = useState([])
    const [isLoadingOptions, setIsLoadingOptions] = useState(true)
    const [helperMessage, setHelperMessage] = useState("")

    useEffect(() => {
        async function fetchOptions() {
            try {
                setIsLoadingOptions(true)
                const [customersResponse, productsResponse] = await Promise.all([
                    getCustomerOptions(),
                    getProductOptions()
                ])

                const nextCustomerOptions = mapCustomerOptions(customersResponse)
                const nextProductOptions = mapProductOptions(productsResponse)

                setCustomerOptions(nextCustomerOptions)
                setProductOptions(nextProductOptions)

                if (!nextCustomerOptions.length || !nextProductOptions.length) {
                    setHelperMessage("You need active products and customers before registering a sale.")
                    return
                }

                setHelperMessage("")
            } catch {
                setCustomerOptions([])
                setProductOptions([])
                setHelperMessage("The form options could not be loaded.")
            } finally {
                setIsLoadingOptions(false)
            }
        }

        fetchOptions()
    }, [])

    const isDisabled = isLoadingOptions || isSubmitting || !customerOptions.length || !productOptions.length

    return (
        <DrawerPanel onClose={onClose}>
            <RegisterSpaceForm
                fields={getSaleFormFields(customerOptions, productOptions, isDisabled)}
                sectionLabel="Sales"
                title="Register your new sale!"
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

export default SaleRegisterModal
