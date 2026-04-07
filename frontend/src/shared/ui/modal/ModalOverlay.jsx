import "./ModalOverlay.css"

function ModalOverlay({ children, onClose }) {
    return (
        <div className="shared-modal-overlay" onClick={onClose}>
            <div className="shared-modal-content" onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default ModalOverlay