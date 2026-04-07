import "./CardButtonCreate.css"

function CardButtonCreate({ onClick }) {
    return (
        <div className="shared-card-button">
            <button onClick={onClick}>Create</button>
        </div>
    )
}

export default CardButtonCreate