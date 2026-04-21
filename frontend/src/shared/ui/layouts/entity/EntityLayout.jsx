import "./EntityLayout.css"
import EntityTitle from "../../titles/entity/EntityTitle.jsx"
import EntityDetails from "./information/EntityDetails.jsx"
import EntityActions from "./toolbar/EntityActions.jsx"

function EntityLayout({ entity, idx, detail, onDeactivateClick, onActivateClick }) {
    return (
        <div className="shared-entity-layout">
            <EntityTitle
                entity={entity}
                idx={idx}
            />
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