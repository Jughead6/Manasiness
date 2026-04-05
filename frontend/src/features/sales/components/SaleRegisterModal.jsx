import DrawerPanel from '../../../shared/ui/modal/DrawerPanel.jsx'
import CreatorBanner from '../../../shared/ui/branding/CreatorBanner.jsx'
import RegisterForm from '../../../shared/ui/forms/RegisterForm.jsx'

import { saleFormFields } from '../config/saleFormFields.jsx'

function SaleRegisterModal({onClose}) {
    return (
        <DrawerPanel onClose={onClose}>
            <RegisterForm fields={saleFormFields} sectionLabel="Sales" title="Register you Sale" onCancel={onClose}/>
            <div className="shared-drawer-banner-slot">
                <CreatorBanner className="bannner"/>
            </div>
        </DrawerPanel>
    )
}

export default SaleRegisterModal   