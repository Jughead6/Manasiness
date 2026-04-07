import "./EntityLayout.css"

import EntityDetails from "./information/EntityDetails.jsx"
import EntityActions from "./toolbar/EntityActions.jsx"

function EntityLayout({ detail, onDeactivateClick }) {
    return (
        <div className="shared-entity-layout">
            <EntityDetails detail={detail} />
            <EntityActions onDeactivateClick={onDeactivateClick} />
        </div>
    )
}

export default EntityLayout