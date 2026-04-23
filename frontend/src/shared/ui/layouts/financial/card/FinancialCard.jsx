import "./FinancialCard.css"

function FinancialCard({ infoCard, titlesCard, isLoading = false }) {
    if (isLoading) {
        return <div className="shared-financial-content-cards">Loading summary...</div>
    }

    return (
        <div className="shared-financial-content-cards">
            <div className="shared-financial-card">
                <h3>{titlesCard.total}</h3>
                <h2 className="shared-financial-card-number">{infoCard.total}</h2>
            </div>
            <div className="shared-financial-card">
                <h3>{titlesCard.totalsub1}</h3>
                <h4 className="shared-financial-card-number">{infoCard.totalsub1}</h4>
                <h3>{titlesCard.totalsub2}</h3>
                <h4 className="shared-financial-card-number">{infoCard.totalsub2}</h4>
            </div>
        </div>
    )
}

export default FinancialCard
