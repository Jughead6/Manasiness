import './cardcontent.css'
import { useNavigate } from 'react-router-dom'

function CardContent({ action, route }) {
    const navigate = useNavigate()
    
    return (
        <div className="card-content">
            {action.map((item) => (
                <div className="cards" key={item.id}>
                    <h3>{item.name}</h3>
                    <img src={item.image} alt={item.name} />
                    <button onClick={() => navigate(`/dashboard/${route}/${item.id}`)}>View</button>
                </div>
            ))}
        </div>
    )
}

export default CardContent

