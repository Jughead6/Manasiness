import ModalOverlay from "../../../shared/ui/modal/ModalOverlay.jsx"
import DeactivationPanel from "../../../shared/ui/panels/DeactivationPanel.jsx"

function ProductDeactivationModal({ onClose, onConfirm }) {
    return (
        <ModalOverlay onClose={onClose}>
            <DeactivationPanel action="Product" onClose={onClose} onConfirm={onConfirm} />
        </ModalOverlay>
    )
}

export default ProductDeactivationModal
