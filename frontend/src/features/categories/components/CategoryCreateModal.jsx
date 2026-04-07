import ModalOverlay from '../../../shared/ui/modal/ModalOverlay.jsx'
import EntityForm from '../../../shared/ui/forms/EntityForm.jsx'
import CreatorBanner from '../../../shared/ui/branding/CreatorBanner.jsx'

import { categoryFormFields } from '../config/categoryFormFields.jsx'

function CategoryCreateModal({ onClose, onCreate }) {
    return (
        <ModalOverlay onClose={onClose}>
            <>
                <EntityForm 
                    sectionLabel="Category ----" 
                    title="Create Your Category" 
                    fields={categoryFormFields} 
                    onCancel={onClose} 
                    onSubmit={onCreate}
                />
                <CreatorBanner/>
            </>
        </ModalOverlay>
    )
}

export default CategoryCreateModal