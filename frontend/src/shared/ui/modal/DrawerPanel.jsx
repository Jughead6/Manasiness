import "./DrawerPanel.css"

function DrawerPanel({ children, onClose }) {
    return (
        <div className="shared-drawer-panel-overlay" onClick={onClose}>
            <div className="shared-drawer-panel-content" onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default DrawerPanel