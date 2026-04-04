import './EntityTitle.css'

function EntityTitle({entity, idx}) {
    return (
        <div className="shared-entity-title">
            <h1>Id {entity}: {idx}</h1>
        </div>
    )
}

export default EntityTitle