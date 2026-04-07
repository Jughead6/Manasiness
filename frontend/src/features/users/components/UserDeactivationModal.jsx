import ModalOverlay from "../../../shared/ui/modal/ModalOverlay.jsx"
import DeactivationPanel from "../../../shared/ui/panels/DeactivationPanel.jsx"

function UserDeactivationModal({ onClose, onConfirm }) {
    return (
        <ModalOverlay onClose={onClose}>
            <DeactivationPanel action="User" onClose={onClose} onConfirm={onConfirm} />
        </ModalOverlay>
    )
}

export default UserDeactivationModal
