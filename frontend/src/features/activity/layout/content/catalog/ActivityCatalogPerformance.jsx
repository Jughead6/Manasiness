import "./ActivityCatalogPerformance.css"

function ActivityCatalogPerformance({ catalogPerformance, catalogOption, setCatalogOption }) {
    const emptyCatalog = !catalogPerformance?.categoryName && !catalogPerformance?.productName

    return (
        <div className="activity-content-catalog-performance">
            <div className="catalog-performance-title">
                <h1>Catalog Performance</h1>

                <div className="activity-content-filter-switch">
                    <input checked={catalogOption === "topSold"} onChange={(e) => setCatalogOption(e.target.value)} id="activity-catalog-option-quantity" name="activityCatalogOptions" type="radio" value="topSold" />
                    <label className="activity-content-filter-option" htmlFor="activity-catalog-option-quantity">Top Sold</label>

                    <input checked={catalogOption === "leastSold"} onChange={(e) => setCatalogOption(e.target.value)} id="activity-catalog-option-revenue" name="activityCatalogOptions" type="radio" value="leastSold" />
                    <label className="activity-content-filter-option" htmlFor="activity-catalog-option-revenue">Least Sold</label>

                    <span className="activity-content-filter-background"></span>
                </div>
            </div>

            {emptyCatalog ? <div className="activity-content-empty catalog-performance-empty">No paid sales found for this period.</div> : null}

            {!emptyCatalog ? (
                <div className="catalog-performance-content">
                    <div className="catalog-performance-content-item">
                        <h2>Category</h2>
                        <img src={catalogPerformance?.categoryImg} alt="category performance" />
                        <h3>{catalogPerformance?.categoryName ?? "No data"}</h3>
                        <h4>Quantity: {catalogPerformance?.categoryQuantity ?? 0}</h4>
                    </div>

                    <div className="catalog-performance-content-item">
                        <h2>Product</h2>
                        <img src={catalogPerformance?.productImg} alt="product performance" />
                        <h3>{catalogPerformance?.productName ?? "No data"}</h3>
                        <h4>Quantity: {catalogPerformance?.productQuantity ?? 0}</h4>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default ActivityCatalogPerformance
