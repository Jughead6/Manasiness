import "./EntityLayout.css"

import EntityDetails from "./information/EntityDetails.jsx"
import EntityActions from "./toolbar/EntityActions.jsx"

function EntityLayout({ detail, onDeactivateClick, onActivateClick }) {
    return (
        <div className="shared-entity-layout">
            <EntityDetails detail={detail} />
            <EntityActions
                isActive={detail.isActive}
                onDeactivateClick={onDeactivateClick}
                onActivateClick={onActivateClick}
            />
        </div>
    )
}

export default EntityLayout