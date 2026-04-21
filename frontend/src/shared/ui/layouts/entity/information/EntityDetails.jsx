import "./EntityDetails.css"

function EntityDetails({ detail }) {
    return (
        <div className="shared-entity-details">
            <div className="shared-entity-details-image">
                <img src={detail.image} alt={detail.name} />
            </div>

            <div className="shared-entity-details-content">
                <fieldset className="shared-entity-details-box">
                    <legend>Name</legend>
                    <p>{detail.name}</p>
                </fieldset>

                {detail.details.map((item, index) => (
                    <fieldset className="shared-entity-details-box" key={index}>
                        <legend>{item.label}</legend>
                        <p>{item.value}</p>
                    </fieldset>
                ))}
            </div>
        </div>
    )
}

export default EntityDetails