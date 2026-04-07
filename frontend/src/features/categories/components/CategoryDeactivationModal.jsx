import ModalOverlay from "../../../shared/ui/modal/ModalOverlay.jsx"
import DeactivationPanel from "../../../shared/ui/panels/DeactivationPanel.jsx"

function CategoryDeactivationModal({ onClose, onConfirm }) {
    return (
        <ModalOverlay onClose={onClose}>
            <DeactivationPanel action="Category" onClose={onClose} onConfirm={onConfirm} />
        </ModalOverlay>
    )
}

export default CategoryDeactivationModal