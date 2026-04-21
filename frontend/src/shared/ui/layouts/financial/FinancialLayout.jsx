import "./FinancialLayout.css"
import StatsTitle from "../../titles/stats/StatsTitle.jsx"
import FinancialBar from "./bar/FinancialBar.jsx"
import FinancialCard from "./card/FinancialCard.jsx"
import FinancialToolBar from "./toolbar/FinancialToolbar.jsx"

function FinancialLayout(data) {
    const { infoBar, setDate, infoCard, titlesCard, title, description, offset, setOffset, hasOlder, startDate, endDate } = data

    return (
        <div className="shared-financial-layout">
            <div className="shared-financial-layout-title">
                <StatsTitle 
                    title={title} 
                    description={description}
                />
            </div>
            <div className="shared-financial-layout-content">
                <div className="shared-financial-content-card">
                    <FinancialCard 
                        infoCard={infoCard} 
                        titlesCard={titlesCard}
                    />
                </div>
                <div className="shared-financial-layout-bar">
                    <FinancialBar 
                        infoBar={infoBar} 
                        setDate={setDate} 
                    />
                </div>
            </div>
            <div  className="shared-financial-layout-toolbar">
                <FinancialToolBar 
                    offset={offset} 
                    setOffset={setOffset}
                    hasOlder={hasOlder}
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
        </div>
    )
}

export default FinancialLayout
