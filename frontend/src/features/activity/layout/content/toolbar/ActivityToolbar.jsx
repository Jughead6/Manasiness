import "./ActivityToolbar.css"
import ActivityToolbarFilter from "./filter/ActivityToolbarFilter.jsx"
import ActivityWindow from "./window/ActivityWindow.jsx"

function ActivityToolbar({ windowLabel, period, setPeriod, offset, setOffset, hasOlder }) {
    const filterGroups = [
        {
            key: "activity-date-filter",
            label: "Range",
            value: period,
            onChange: (e) => setPeriod(e.target.value),
            options: [
                { value: "week", label: "Week" },
                { value: "month", label: "Month" }
            ]
        }
    ]

    return (
        <div className="activity-content-toolbar">
            <div className="activity-content-toolbar-side">
                <ActivityToolbarFilter filterGroups={filterGroups} />
            </div>

            <div className="activity-content-toolbar-center">
                <ActivityWindow label={windowLabel} offset={offset} setOffset={setOffset} hasOlder={hasOlder} />
            </div>

            <div className="activity-content-toolbar-side"></div>
        </div>
    )
}

export default ActivityToolbar
