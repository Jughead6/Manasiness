import "./DeactivationPanel.css"

function DeactivationPanel({ onClose, onConfirm, action = "item" }) {
    return (
        <div className="shared-deactivation-panel">
            <div className="shared-deactivation-hero">
                <p className="shared-deactivation-label">{action} status</p>
                <h2 className="shared-deactivation-title">Deactivate {action}</h2>
            </div>

            <div className="shared-deactivation-warning">
                <h3>Are you sure?</h3>
                <p>This {action} will no longer be available for normal use. Its previous records will remain saved, but it will stay inactive.</p>
            </div>

            <div className="shared-deactivation-actions">
                <button className="shared-deactivation-cancel" type="button" onClick={onClose}>Cancel</button>
                <button className="shared-deactivation-confirm" type="button" onClick={onConfirm}>Deactivate</button>
            </div>
        </div>
    )
}

export default DeactivationPanel