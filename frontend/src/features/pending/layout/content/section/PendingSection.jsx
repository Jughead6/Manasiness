import "./PendingSection.css"
import { formatCurrency } from "../utils/formatCurrency"

function PendingSection({ title, scope, items, onResolve, submittingKey }) {
    return (
        <div className="pending-content-section">
            <div className="pending-content-title">
                <h3>{title}</h3>
                <p>{items.length} pending</p>
            </div>

            <div className="pending-content-users">
                {items.length === 0 ? (
                    <div className="pending-content-empty">
                        <p>No pending records.</p>
                    </div>
                ) : null}

                {items.map((item) => {
                    const isPaidLoading = submittingKey === `${scope}-${item.id}-paid`
                    const isCanceledLoading = submittingKey === `${scope}-${item.id}-canceled`
                    const isDisabled = Boolean(submittingKey)

                    return (
                        <div className="pending-content-user" key={item.id}>
                            <div className="pending-content-user-info">
                                <p className="pending-content-user-name">{item.name}</p>
                                <p className="pending-content-user-amount">{formatCurrency(item.amount)}</p>
                                <p className="pending-content-user-time">{item.dayAgo}</p>
                            </div>

                            <div className="pending-content-user-actions">
                                <button type="button" id="paid" onClick={() => onResolve(scope, item.id, "paid")} disabled={isDisabled}>
                                    {isPaidLoading ? "Saving..." : "Mark Paid"}
                                </button>

                                <button type="button" id="canceled" onClick={() => onResolve(scope, item.id, "canceled")} disabled={isDisabled}>
                                    {isCanceledLoading ? "Saving..." : "Cancel"}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PendingSection