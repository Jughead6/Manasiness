import ModalOverlay from '../../../shared/ui/modal/ModalOverlay.jsx'
import EntityForm from '../../../shared/ui/forms/EntityForm.jsx'
import CreatorBanner from '../../../shared/ui/branding/CreatorBanner.jsx'

import { productFormFields } from '../config/productFormFields.jsx'

function ProductCreateModal({ onClose }) {
    return (
        <ModalOverlay onClose={onClose}>
            <>
                <EntityForm
                    sectionLabel="Products ----"
                    title="Create Your Product"
                    fields={productFormFields}
                    onCancel={onClose}
                />
                <CreatorBanner />
            </>
        </ModalOverlay>
    )
}

export default ProductCreateModal