import ModalOverlay from '../../../shared/ui/modal/ModalOverlay.jsx'
import EntityForm from '../../../shared/ui/forms/EntityForm.jsx'
import CreatorBanner from '../../../shared/ui/branding/CreatorBanner.jsx'

import { categoryFormFields } from '../config/categoryFormFields.jsx'

function CategoryCreateModal({ onClose }) {
    return (
        <ModalOverlay onClose={onClose}>
            <>
                <EntityForm
                    sectionLabel="Category ----"
                    title="Create Your Category"
                    fields={categoryFormFields}
                    onCancel={onClose}
                />
                <CreatorBanner/>
            </>
        </ModalOverlay>
    )
}

export default CategoryCreateModal