import PanelOverlay from "../../../shared/ui/modal/PanelOverlay"
import DesactivationPanel from "../../../shared/ui/panels/DesactivationPanel"

function CategoryDesactivationModal({ onClose }) {
    return (
        <PanelOverlay onClose={onClose}>
            <DesactivationPanel action="Category" onClose={onClose} />
        </PanelOverlay>
    )
}

export default CategoryDesactivationModal