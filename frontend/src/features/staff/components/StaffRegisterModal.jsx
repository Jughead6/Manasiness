import { useState, useEffect } from "react"
import DrawerPanel from "../../../shared/ui/modal/DrawerPanel.jsx"
import CreatorBanner from "../../../shared/ui/branding/CreatorBanner.jsx"
import RegisterSpaceForm from "../../../shared/ui/forms/RegisterSpaceForm.jsx"
import { getStaffFormFields } from "../config/staffFormFields.jsx"
import { getWorkerOptions } from "../api/staff.api.js"
import { mapWorkerOptions } from "../mappers/staff.mapper.js"

function StaffRegisterModal({onClose, onCreate }) {
    const [ workerOptions, setWorkerOptions  ] = useState([])

    useEffect(() => {
        async function fetchWorkerOptions() {
            try {
                const response = await getWorkerOptions()
                setWorkerOptions(mapWorkerOptions(response))
            } catch {
                setWorkerOptions([])
            }
        }
        fetchWorkerOptions()
    }, [])

    return (
        <DrawerPanel onClose={onClose}>
            <RegisterSpaceForm fields={getStaffFormFields(workerOptions)} 
            sectionLabel="Staff" 
            title="Register a new payment to a staff member!" 
            onCancel={onClose} 
            onSubmit={onCreate}
        />
            <div className="shared-drawer-banner-slot">
                <CreatorBanner/>
            </div>
        </DrawerPanel>
    )
}

export default StaffRegisterModal   