import DrawerPanel from '../../../shared/ui/modal/DrawerPanel'
import CreatorBanner from '../../../shared/ui/branding/CreatorBanner'
import RegisterForm from '../../../shared/ui/forms/RegisterForm'

import { orderFormFields } from '../config/orderFormFields'

function OrderRegisterModal({onClose, onCreate}) {
    return (
        <DrawerPanel onClose={onClose}>
            <RegisterForm 
                fields={orderFormFields} 
                sectionLabel="Orders" 
                title="Register you Order" 
                onCancel={onClose} 
                onSubmit={onCreate}/>
            <div className="shared-drawer-banner-slot">
                <CreatorBanner className="bannner"/>
            </div>
        </DrawerPanel>
    )
}

export default OrderRegisterModal   