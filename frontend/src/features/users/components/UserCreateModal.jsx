import ModalOverlay from '../../../shared/ui/modal/ModalOverlay.jsx'
import EntityForm from '../../../shared/ui/forms/EntityForm.jsx'
import CreatorBanner from '../../../shared/ui/branding/CreatorBanner.jsx'

import { userFormFields } from '../config/userFormFields.jsx'

function UserCreateModal({ onClose }) {
    return (
        <ModalOverlay onClose={onClose}>
            <>
                <EntityForm
                    sectionLabel="Users ----"
                    title="Create Your User"
                    fields={userFormFields}
                    onCancel={onClose}
                />
                <CreatorBanner/>
            </>
        </ModalOverlay>
    )
}

export default UserCreateModal