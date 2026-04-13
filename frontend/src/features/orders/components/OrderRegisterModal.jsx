import { useState, useEffect } from "react"
import DrawerPanel from "../../../shared/ui/modal/DrawerPanel.jsx"
import CreatorBanner from "../../../shared/ui/branding/CreatorBanner.jsx"
import RegisterSpaceForm from "../../../shared/ui/forms/RegisterSpaceForm.jsx"
import { getOrderFormFields } from "../config/orderFormFields.jsx"
import { getSupplierOptions } from "../api/orders.api.js"
import { mapSupplierOptions } from "../mappers/orders.mapper.js"
import { getProductOptions } from "../../products/api/products.api.js"
import { mapProductOptions } from "../../products/mappers/products.mapper.js"

function OrderRegisterModal({onClose, onCreate}) {
    const [ productOptions, setProductOptions ] = useState([])
    const [ supplierOptions, setSupplierOptions  ] = useState([])

    useEffect(() => {
        async function fetchWorkerOptions() {
            try {
                const response = await getSupplierOptions()
                setSupplierOptions(mapSupplierOptions(response))
                const products = await getProductOptions()
                setProductOptions(mapProductOptions(products))
            } catch {
                setSupplierOptions([])
                setProductOptions([])
            }
        }
        fetchWorkerOptions()
    }, [])

    return (
        <DrawerPanel onClose={onClose}>
            <RegisterSpaceForm 
                fields={getOrderFormFields(supplierOptions, productOptions)}
                sectionLabel="Orders" 
                title="Register your new order!" 
                onCancel={onClose} 
                onSubmit={onCreate}/>
            <div className="shared-drawer-banner-slot">
                <CreatorBanner />
            </div>
        </DrawerPanel>
    )
}

export default OrderRegisterModal   