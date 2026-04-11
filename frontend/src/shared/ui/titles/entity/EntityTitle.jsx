import "./EntityTitle.css"

function EntityTitle({ entity, id, idx }) {
    const entityId = id ?? idx

    return (
        <div className="shared-entity-title">
            <h1>Id {entity}: {entityId}</h1>
        </div>
    )
}

export default EntityTitle
