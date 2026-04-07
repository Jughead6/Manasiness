import "./CardGrid.css"

import { useNavigate } from "react-router-dom"

function CardGrid({ data, route }) {
    const navigate = useNavigate()
    
    return (
        <div className="shared-card-grid">
            {data.map((item) => (
                <div className="shared-card-item" key={item.id}>
                    <h3>{item.name}</h3>
                    <img src={item.image} alt={item.name}/>
                    <button onClick={() => navigate(`/dashboard/${route}/${item.id}`)}>View</button>
                </div>
            ))}
        </div>
    )
}

export default CardGrid

