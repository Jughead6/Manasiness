import "./PendingContent.css"
import PendingSummary from "./summary/PendingSummary.jsx"
import PendingSection from "./section/PendingSection.jsx"

function PendingContent({ customers = [], suppliers = [], workers = [], summary, onResolve, submittingKey, currencyCode = "PEN" }) {
    const sections = [
        { title: "Customer", scope: "customers", items: customers },
        { title: "Supplier", scope: "suppliers", items: suppliers },
        { title: "Worker", scope: "workers", items: workers }
    ]

    return (
        <div className="pending-content">
            <PendingSummary summary={summary} currencyCode={currencyCode} />
            <div className="pending-content-sections">
                {sections.map((section) => (
                    <PendingSection key={section.scope} title={section.title} scope={section.scope} items={section.items} onResolve={onResolve} submittingKey={submittingKey} currencyCode={currencyCode} />
                ))}
            </div>
        </div>
    )
}

export default PendingContent
