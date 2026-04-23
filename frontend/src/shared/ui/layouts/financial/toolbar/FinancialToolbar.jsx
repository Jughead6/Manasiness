import "./FinancialToolbar.css"
import FinancialToolbarFilter from "./filter/FinancialToolbarFilter.jsx"
import FinancialWindow from "./window/FinancialWindow.jsx"

function FinancialToolbar({ period, setPeriod, offset, setOffset, hasOlder, startDate, endDate }) {
    const filterGroups = [
        {
            key: "financial-period-filter",
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
        <div className="shared-financial-toolbar">
            <div className="shared-financial-toolbar-side">
                <FinancialToolbarFilter filterGroups={filterGroups} />
            </div>
            <div className="shared-financial-toolbar-center">
                <FinancialWindow offset={offset} setOffset={setOffset} hasOlder={hasOlder} startDate={startDate} endDate={endDate} />
            </div>
            <div className="shared-financial-toolbar-side"></div>
        </div>
    )
}

export default FinancialToolbar
