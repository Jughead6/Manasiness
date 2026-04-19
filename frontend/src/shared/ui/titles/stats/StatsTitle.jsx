import "./StatsTitle.css"

function StatsTitle(data) {
    const { title, description } = data

    return (
        <div className="shared-stats-title">
            <div className="shared-stats-welcome">
                <h2>Welcome to stats!</h2>
                <h1 className="shared-stats-welcome-title">{title}</h1>
            </div>
            <div className="shared-stats-description">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default StatsTitle