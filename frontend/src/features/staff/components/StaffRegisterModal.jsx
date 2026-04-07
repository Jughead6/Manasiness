import DrawerPanel from "../../../shared/ui/modal/DrawerPanel.jsx"
import CreatorBanner from "../../../shared/ui/branding/CreatorBanner.jsx"
import RegisterForm from "../../../shared/ui/forms/RegisterForm.jsx"
import { staffFormFields } from "../config/staffFormFields.jsx"

function StaffRegisterModal({onClose, onCreate }) {
    return (
        <DrawerPanel onClose={onClose}>
            <RegisterForm fields={staffFormFields} 
            sectionLabel="Staff" 
            title="Register a new payment to a staff member!" 
            onCancel={onClose} 
            onSubmit={onCreate }
        />
            <div className="shared-drawer-banner-slot">
                <CreatorBanner/>
            </div>
        </DrawerPanel>
    )
}

export default StaffRegisterModal   