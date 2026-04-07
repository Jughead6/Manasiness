import "./DeactivationPanel.css"

function DeactivationPanel({ onClose, onConfirm, action }) {
    return (
        <div className="shared-deactivation-panel">
            <div className="shared-deactivation-hero">
                <p>{action} status ---</p>
                <h2>Deactivate {action}</h2>
            </div>

            <div className="shared-deactivation-warning">
                <h3>Are you sure?</h3>
                <p>
                    This {action} will no longer be available for normal use. Its previous records will remain, but it
                    will stay inactive.
                </p>
            </div>

            <div className="shared-deactivation-actions">
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
                <button type="button" onClick={onConfirm}>
                    Deactivate
                </button>
            </div>
        </div>
    )
}

export default DeactivationPanel
