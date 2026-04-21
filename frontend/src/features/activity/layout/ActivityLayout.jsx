import "./ActivityLayout.css"
import StatsTitle from "../../../shared/ui/titles/stats/StatsTitle"
import ActivityContent from "./content/ActivityContent"

function ActivityLayout(data) {
    const { title, description, growthRate, dayPerformance, catalogPerformance, activityDateFilter, setActivityDateFilter, setCatalogOption, offset, setOffset, hasPrevious} = data
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
                    activityDateFilter={activityDateFilter}
                    setActivityDateFilter={setActivityDateFilter}
                    setCatalogOption={setCatalogOption}
                    offset={offset}
                    setOffset={setOffset}
                    hasPrevious={hasPrevious}
                />
            </div>
        </div>
    )
}

export default ActivityLayout