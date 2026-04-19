import "./PendingContent.css"

function PendingContent(data) {
    const { customers, suppliers, workers } = data

    return (
        <div className="pending-content">
            <div className="pending-content-section">
                <div className="pending-content-title">
                    <h3>Customer</h3>
                </div>
                <div className="pending-content-users">
                    { customers.map((item) => (
                        <div className="pending-content-user" key={item.id}>
                            <p>{item.name}</p>
                            <p>{item.amount}</p>
                            <p>{item.day_ago}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pending-content-section">
                <div className="pending-content-title">
                    <h3>Supplier</h3>
                </div>
                <div className="pending-content-users">
                    { suppliers.map((item) => (
                        <div className="pending-content-user" key={item.id}>
                            <p>{item.name}</p>
                            <p>{item.amount}</p>
                            <p>{item.day_ago}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pending-content-section">
                <div className="pending-content-title">
                    <h3>Worker</h3>
                </div>
                <div className="pending-content-users">
                    { workers.map((item) => (
                        <div className="pending-content-user" key={item.id}>
                            <p>{item.name}</p>
                            <p>{item.amount}</p>
                            <p>{item.day_ago}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PendingContent