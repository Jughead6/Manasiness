import "./ActivityContent.css"
import ActivityToolbar from "./toolbar/ActivityToolbar.jsx"
import ActivityCards from "./cards/ActivityCards.jsx"
import ActivityCatalogPerformance from "./catalog/ActivityCatalogPerformance.jsx"

function ActivityContent({ growthRate, dayPerformance, catalogPerformance, period, setPeriod, catalogOption, setCatalogOption, offset, setOffset, hasOlder }) {
    return (
        <div className="activity-content">
            <ActivityToolbar
                windowLabel={growthRate?.date ?? ""}
                period={period}
                setPeriod={setPeriod}
                offset={offset}
                setOffset={setOffset}
                hasOlder={hasOlder}
            />

            <ActivityCards growthRate={growthRate} dayPerformance={dayPerformance} />
            <ActivityCatalogPerformance catalogPerformance={catalogPerformance} catalogOption={catalogOption} setCatalogOption={setCatalogOption} />
        </div>
    )
}

export default ActivityContent
