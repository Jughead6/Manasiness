import "./FinancialCard.css"
import { formatCurrency } from "../../../../utils/currency.js"

function FinancialCard({ infoCard, titlesCard, isLoading = false, currencyCode = "PEN" }) {
    if (isLoading) {
        return <div className="shared-financial-content-cards">Loading summary...</div>
    }

    return (
        <div className="shared-financial-content-cards">
            <div className="shared-financial-card">
                <h3>{titlesCard.total}</h3>
                <h2 className="shared-financial-card-number">{formatCurrency(infoCard.total, currencyCode)}</h2>
            </div>
            <div className="shared-financial-card">
                <h3>{titlesCard.totalsub1}</h3>
                <h4 className="shared-financial-card-number">{formatCurrency(infoCard.totalsub1, currencyCode)}</h4>
                <h3>{titlesCard.totalsub2}</h3>
                <h4 className="shared-financial-card-number">{formatCurrency(infoCard.totalsub2, currencyCode)}</h4>
            </div>
        </div>
    )
}

export default FinancialCard
