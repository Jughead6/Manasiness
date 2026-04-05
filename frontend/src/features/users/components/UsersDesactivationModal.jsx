import PanelOverlay from "../../../shared/ui/modal/PanelOverlay"
import DesactivationPanel from "../../../shared/ui/panels/DesactivationPanel"

function UsersDesactivationModal({ onClose }) {
    return (
        <PanelOverlay onClose={onClose}>
            <DesactivationPanel action="User" onClose={onClose}/>
        </PanelOverlay>
    )
}

export default UsersDesactivationModal