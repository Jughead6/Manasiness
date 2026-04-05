import './CardGrid.css'

import { useNavigate } from 'react-router-dom'

function CardGrid({ action, route }) {
    const navigate = useNavigate()
    
    return (
        <div className="shared-card-grid">
            {action.map((item) => (
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

