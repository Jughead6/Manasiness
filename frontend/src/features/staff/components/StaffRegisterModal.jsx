import DrawerPanel from '../../../shared/ui/modal/DrawerPanel'
import CreatorBanner from '../../../shared/ui/branding/CreatorBanner'
import RegisterForm from '../../../shared/ui/forms/RegisterForm.jsx'

import { staffFormFields } from '../config/staffFormFields.jsx'

function StaffRegisterModal({onClose}) {
    return (
        <DrawerPanel onClose={onClose}>
            <RegisterForm fields={staffFormFields} sectionLabel="Staffs" title="Register you Staff" onCancel={onClose}/>
            <div className="shared-drawer-banner-slot">
                <CreatorBanner className="bannner"/>
            </div>
        </DrawerPanel>
    )
}

export default StaffRegisterModal   