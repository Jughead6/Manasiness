import PanelOverlay from "../../../shared/ui/modal/PanelOverlay"
import DesactivationPanel from "../../../shared/ui/panels/DesactivationPanel"

function ProductDesactivationModal({ onClose }) {
    return (
        <PanelOverlay onClose={onClose}>
            <DesactivationPanel action="Product" onClose={onClose}/>
        </PanelOverlay>
    )
}

export default ProductDesactivationModal