import "./ActivityCards.css"

function ActivityCards({ growthRate, dayPerformance }) {
    return (
        <div className="activity-content-cards">
            <div className="activity-content-card">
                <div className="activity-content-card-title">
                    <h1>Growth Rate</h1>
                </div>

                <div className="activity-content-card-content">
                    <div>
                        <h2 className="activity-content-card-percentage">{growthRate?.growthRate ?? 0} %</h2>
                        <p>{growthRate?.summary ?? "No previous paid sales to compare."}</p>
                    </div>
                </div>
            </div>

            <div className="activity-content-card">
                <div className="activity-content-card-title">
                    <h1>Day Performance</h1>
                </div>

                <div className="activity-content-card-content">
                    <div>
                        <h3>Best Day</h3>
                        <h2>{dayPerformance?.bestDay ?? "No data"}</h2>
                        <p>{dayPerformance?.bestDayDate ?? ""}</p>
                        <p>Total: {dayPerformance?.bestDayTotalLabel ?? "$0.00"}</p>
                    </div>

                    <div>
                        <h3>Worst Day</h3>
                        <h2>{dayPerformance?.worstDay ?? "No data"}</h2>
                        <p>{dayPerformance?.worstDayDate ?? ""}</p>
                        <p>Total: {dayPerformance?.worstDayTotalLabel ?? "$0.00"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityCards
