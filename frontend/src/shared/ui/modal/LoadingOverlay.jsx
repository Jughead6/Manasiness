import "./LoadingOverlay.css"

function LoadingOverlay({ message = "Loading..." }) {
    return (
        <div className="shared-loading-overlay" aria-live="polite" aria-busy="true">
            <div className="shared-loading-overlay-modal">
                <div className="shared-loading-overlay-spinner"></div>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default LoadingOverlay
