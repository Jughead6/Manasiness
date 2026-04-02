import './cardcontent.css'

function CardContent({ action }) {
    return (
        <div id="card-content">
            {action.map((item) => (
                <div className="cards" key={item.id}>
                    <h3>{item.name}</h3>
                    <img src={item.image} alt={item.name} />
                    <button>View</button>
                </div>
            ))}
        </div>
    )
}

export default CardContent

