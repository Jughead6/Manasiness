import { useState, useEffect } from "react"
import DrawerPanel from "../../../shared/ui/modal/DrawerPanel.jsx"
import CreatorBanner from "../../../shared/ui/branding/CreatorBanner.jsx"
import RegisterSpaceForm from "../../../shared/ui/forms/RegisterSpaceForm.jsx"
import { getStaffFormFields } from "../config/staffFormFields.jsx"
import { getWorkerOptions } from "../api/staff.api.js"
import { mapWorkerOptions } from "../mappers/staff.mapper.js"

function StaffRegisterModal({ onClose, onCreate, isSubmitting }) {
    const [workerOptions, setWorkerOptions] = useState([])
    const [isLoadingOptions, setIsLoadingOptions] = useState(true)
    const [helperMessage, setHelperMessage] = useState("")

    useEffect(() => {
        async function fetchOptions() {
            try {
                setIsLoadingOptions(true)
                const response = await getWorkerOptions()
                const nextWorkerOptions = mapWorkerOptions(response)

                setWorkerOptions(nextWorkerOptions)

                if (!nextWorkerOptions.length) {
                    setHelperMessage("You need active workers before registering a payment.")
                    return
                }

                setHelperMessage("")
            } catch {
                setWorkerOptions([])
                setHelperMessage("The form options could not be loaded.")
            } finally {
                setIsLoadingOptions(false)
            }
        }

        fetchOptions()
    }, [])

    const isDisabled = isLoadingOptions || isSubmitting || !workerOptions.length

    return (
        <DrawerPanel onClose={onClose}>
            <RegisterSpaceForm
                fields={getStaffFormFields(workerOptions, isDisabled)}
                sectionLabel="Staff"
                title="Register a new payment to a staff member!"
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

export default StaffRegisterModal
