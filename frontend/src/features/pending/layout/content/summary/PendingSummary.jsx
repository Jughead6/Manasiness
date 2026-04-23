import "./PendingSummary.css"
import { formatCurrency } from "../utils/formatCurrency"

function PendingSummary({ summary }) {
    return (
        <div className="pending-content-summary">
            <div className="pending-content-summary-card">
                <h3>All Pending</h3>
                <h2>{formatCurrency(summary?.global?.total)}</h2>
                <p>{summary?.global?.count ?? 0} records</p>
            </div>

            <div className="pending-content-summary-card">
                <h3>Customers</h3>
                <h2>{formatCurrency(summary?.customers?.total)}</h2>
                <p>{summary?.customers?.count ?? 0} records</p>
            </div>

            <div className="pending-content-summary-card">
                <h3>Suppliers</h3>
                <h2>{formatCurrency(summary?.suppliers?.total)}</h2>
                <p>{summary?.suppliers?.count ?? 0} records</p>
            </div>

            <div className="pending-content-summary-card">
                <h3>Workers</h3>
                <h2>{formatCurrency(summary?.workers?.total)}</h2>
                <p>{summary?.workers?.count ?? 0} records</p>
            </div>
        </div>
    )
}

export default PendingSummary