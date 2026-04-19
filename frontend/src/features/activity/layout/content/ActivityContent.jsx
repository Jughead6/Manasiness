import "./ActivityContent.css"

function ActivityContent(data) {
    const { growthRate, dayPerformance, catalogPerformance} = data
    
    return (
        <div className="activity-content">
            <div className="activity-content-cards">
                <div className="activity-content-card">
                    <div className="activity-content-card-title">
                        <h1>Growth Rate</h1>
                        <select>
                            <option>Day</option>
                            <option>Week</option>
                            <option>Month</option>
                        </select>
                    </div>                    
                    <div className="activity-content-card-content">
                        <div>
                            <h2>{growthRate?.growthRate ?? 0} %</h2>
                            <h3>{growthRate?.date ?? ""}</h3>
                        </div>
                    </div>               
                </div>
                <div className="activity-content-card">
                    <div className="activity-content-card-title">
                        <h1>Day Performance</h1>
                        <select>
                            <option>Day</option>
                            <option>Week</option>
                            <option>Month</option>
                        </select>
                    </div>
                    <div className="activity-content-card-content">
                        <div>
                            <h3>Best Day</h3>
                            <h2>{dayPerformance?.bestDay ?? ""}</h2>
                        </div>
                        <div>
                            <h3>Worst Day</h3>
                            <h2>{dayPerformance?.worstDay ?? ""}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="activity-content-catalog-performance">
                <div className="catalog-performance-title">
                    <h1>Catalog Performance</h1>
                    <select>
                        <option>Day</option>
                        <option>Week</option>
                        <option>Month</option>
                    </select>
                </div>
                <div className="catalog-performance-content">
                    <div className="catalog-performance-content-item">
                        <h2>Category</h2>
                        <img src={catalogPerformance?.categoryImg} alt="top category"></img>
                        <h3>{catalogPerformance?.categoryName ?? ""}</h3>
                        <h4>Quantity: {catalogPerformance?.categoryQuantity ?? 0}</h4>
                    </div>
                    <div className="catalog-performance-content-item">
                        <h2>Product</h2>
                        <img src={catalogPerformance?.productImg} alt="top product"></img>
                        <h3>{catalogPerformance?.productName ?? ""}</h3>
                        <h4>Quantity: {catalogPerformance?.productQuantity ?? 0}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityContent