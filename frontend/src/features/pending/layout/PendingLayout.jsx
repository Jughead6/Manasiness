import "./PendingLayout.css"
import StatsLayout from "../../../shared/ui/layouts/stats/StatsLayout.jsx"
import PendingContent from "./content/PendingContent.jsx"
import LoadingOverlay from "../../../shared/ui/modal/LoadingOverlay.jsx"

function PendingLayout({ title, description, customers, suppliers, workers, summary, isLoading, onResolve, submittingKey }) {
    return (
        <StatsLayout
            className="pending-layout"
            titleClassName="pending-layout-title"
            contentClassName="pending-layout-content"
            title={title}
            description={description}
        >
            <PendingContent
                customers={customers}
                suppliers={suppliers}
                workers={workers}
                summary={summary}
                onResolve={onResolve}
                submittingKey={submittingKey}
            />
            {isLoading ? <LoadingOverlay /> : null}
        </StatsLayout>
    )
}

export default PendingLayout
