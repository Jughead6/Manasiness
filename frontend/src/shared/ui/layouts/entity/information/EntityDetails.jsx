import './EntityDetails.css'

function EntityDetails({ detail }) {
    return (
        <div className="shared-entity-details">
            <div className="shared-entity-details-image">
                <img src={detail.image} alt={detail.name} />
            </div>
            <div className="shared-entity-details-content">
                <h2>Information</h2>
                <h3>Name: {detail.name}</h3>
                {detail.details.map((item, index) => (
                    <h3 key={index}>{item}</h3>
                ))}
            </div>
        </div>
    )
}

export default EntityDetails