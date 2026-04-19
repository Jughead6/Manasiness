import "./ActivityLayout.css"
import StatsTitle from "../../../shared/ui/titles/stats/StatsTitle"
import ActivityContent from "./content/ActivityContent"

function ActivityLayout(data) {
    const { title, description, growthRate, dayPerformance, catalogPerformance} = data
    return (
        <div className="activity-layout">
            <div className="activity-layout-title"> 
                <StatsTitle
                    title={title}
                    description={description}
                />
            </div>
            <div className="activity-layout-content">
                <ActivityContent
                    growthRate={growthRate}
                    dayPerformance={dayPerformance}
                    catalogPerformance={catalogPerformance}
                />
            </div>
        </div>
    )
}

export default ActivityLayout