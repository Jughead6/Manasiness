import DrawerPanel from "../../../shared/ui/modal/DrawerPanel.jsx"
import CreatorBanner from "../../../shared/ui/branding/CreatorBanner.jsx"
import RegisterForm from "../../../shared/ui/forms/RegisterForm.jsx"
import { orderFormFields } from "../config/orderFormFields.jsx"

function OrderRegisterModal({onClose, onCreate}) {
    return (
        <DrawerPanel onClose={onClose}>
            <RegisterForm 
                fields={orderFormFields} 
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