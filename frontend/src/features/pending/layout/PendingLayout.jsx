import "./PendingLayout.css"
import StatsTitle from "../../../shared/ui/titles/stats/StatsTitle"
import PendingContent from "./content/PendingContent"

function PendingLayout(data) {
    const { title, description, customers, suppliers, workers } = data

    return (
        <div className="pending-layout">
            <div className="pending-layout-title"> 
                <StatsTitle 
                    title={title} 
                    description={description}
                />
            </div>
            <div className="pending-layout-content">
                <PendingContent 
                    customers={customers}
                    suppliers={suppliers} 
                    workers={workers}
                />
            </div>
        </div>
    )
}

export default PendingLayout
