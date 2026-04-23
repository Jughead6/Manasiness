import "./CardGrid.css"

import { useNavigate } from "react-router-dom"

function CardGrid({ data, route, emptyMessage = "No records found" }) {
    const navigate = useNavigate()
    const safeData = Array.isArray(data) ? data : []

    if (!safeData.length) {
        return <div className="shared-card-grid shared-card-grid-feedback">{emptyMessage}</div>
    }

    return (
        <div className="shared-card-grid">
            {safeData.map((item) => (
                <div className="shared-card-item" key={item.id}>
                    <div className="shared-card-item-header">
                        <h3>{item.name}</h3>
                        {item.status && <span className={`shared-card-status shared-card-status-${item.status.toLowerCase()}`}>{item.status}</span>}
                    </div>
                    <img src={item.image} alt={item.name}/>
                    {item.details?.length ? <div className="shared-card-details">{item.details.map((detail, index) => <p key={`${item.id}-${index}`}>{detail}</p>)}</div> : null}
                    <button onClick={() => navigate(`/dashboard/${route}/${item.id}`)}>View</button>
                </div>
            ))}
        </div>
    )
}

export default CardGrid
