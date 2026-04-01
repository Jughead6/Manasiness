import './actioncontent.css'


function ActionContent({ action }) {
    return (
        <div id="action-content">
            {action.map((item) => (
                <div className="content-card" key={item.id}>
                    <h3>{item.name}</h3>
                    <img src={item.image} alt={item.name} />
                    {item.details.map((info, index) => (
                        <h4 key={index}>{info}</h4>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default ActionContent