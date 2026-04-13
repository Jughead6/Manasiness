import { useState, useEffect } from "react"
import DrawerPanel from "../../../shared/ui/modal/DrawerPanel.jsx"
import CreatorBanner from "../../../shared/ui/branding/CreatorBanner.jsx"
import RegisterSpaceForm from "../../../shared/ui/forms/RegisterSpaceForm.jsx"
import { getSaleFormFields } from "../config/saleFormFields.jsx"
import { getCustomerOptions } from "../api/sales.api.js"
import { mapCustomerOptions } from "../mappers/sales.mapper.js"
import { getProductOptions } from "../../products/api/products.api.js"
import { mapProductOptions } from "../../products/mappers/products.mapper.js"

function SaleRegisterModal({onClose, onCreate}) {
    const [customerOptions, setCustomerOptions] = useState([])
    const [productOptions, setProductOptions] = useState([])

    useEffect(() => {
        async function fetchWorkerOptions() {
            try {
                const response = await getCustomerOptions()
                setCustomerOptions(mapCustomerOptions(response))
                const products = await getProductOptions()
                setProductOptions(mapProductOptions(products))
            } catch {
                setProductOptions(null)
            }
        }
        fetchWorkerOptions()
    }, [])

    return (
        <DrawerPanel onClose={onClose}>
            <RegisterSpaceForm 
                fields={getSaleFormFields(customerOptions, productOptions)} 
                sectionLabel="Sales" 
                title="Register your new sale!" 
                onCancel={onClose}
                onSubmit={onCreate}
            />
            <div className="shared-drawer-banner-slot">
                <CreatorBanner />
            </div>
        </DrawerPanel>
    )
}

export default SaleRegisterModal   