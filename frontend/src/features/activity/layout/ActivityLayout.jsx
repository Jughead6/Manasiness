import "./ActivityLayout.css"
import StatsLayout from "../../../shared/ui/layouts/stats/StatsLayout.jsx"
import ActivityContent from "./content/ActivityContent.jsx"
import LoadingOverlay from "../../../shared/ui/modal/LoadingOverlay.jsx"

function ActivityLayout({ title, description, growthRate, dayPerformance, catalogPerformance, period, setPeriod, catalogOption, setCatalogOption, offset, setOffset, hasOlder, isLoading }) {
    return (
        <StatsLayout
            className="activity-layout"
            titleClassName="activity-layout-title"
            contentClassName="activity-layout-content"
            title={title}
            description={description}
        >
            <ActivityContent
                growthRate={growthRate}
                dayPerformance={dayPerformance}
                catalogPerformance={catalogPerformance}
                period={period}
                setPeriod={setPeriod}
                catalogOption={catalogOption}
                setCatalogOption={setCatalogOption}
                offset={offset}
                setOffset={setOffset}
                hasOlder={hasOlder}
            />
            {isLoading ? <LoadingOverlay /> : null}
        </StatsLayout>
    )
}

export default ActivityLayout
