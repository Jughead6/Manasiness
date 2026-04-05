import './DesactivationPanel.css'

function DesactivationPanel({ onClose, action }) {
    return (
        <div className="shared-desactivation-panel">
            <div className="shared-desactivation-hero">
                <h4>{action} status ---</h4>
                <h1>Deactivate {action}</h1>
            </div>

            <div className="shared-desactivation-warning">
                <h2>You are sure?</h2>
                <h3>This {action} will no longer be available for normal use. Its previous records will remain, but it will stay inactive.</h3>
            </div>

            <div className="shared-desactivation-panel-actions">
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="button">Deactivate</button>
            </div>
        </div>
    )
}

export default DesactivationPanel