import "./FinancialLayout.css"
import StatsLayout from "../stats/StatsLayout.jsx"
import FinancialBar from "./bar/FinancialBar.jsx"
import FinancialCard from "./card/FinancialCard.jsx"
import FinancialToolbar from "./toolbar/FinancialToolbar.jsx"
import LoadingOverlay from "../../modal/LoadingOverlay.jsx"

function FinancialLayout({ infoBar, setDate, infoCard, titlesCard, title, description, offset, setOffset, hasOlder, startDate, endDate, period, setPeriod, isLoadingBar = false, isLoadingCard = false, currencyCode = "PEN" }) {
    const toolbar = (
        <FinancialToolbar
            period={period}
            setPeriod={setPeriod}
            offset={offset}
            setOffset={setOffset}
            hasOlder={hasOlder}
            startDate={startDate}
            endDate={endDate}
        />
    )

    return (
        <StatsLayout
            className="shared-financial-layout"
            titleClassName="shared-financial-layout-title"
            contentClassName="shared-financial-layout-content"
            toolbarClassName="shared-financial-layout-toolbar"
            title={title}
            description={description}
            toolbar={toolbar}
            toolbarPosition="after-content"
        >
            <div className="shared-financial-content-card">
                <FinancialCard infoCard={infoCard} titlesCard={titlesCard} currencyCode={currencyCode} />
            </div>
            <div className="shared-financial-layout-bar">
                <FinancialBar infoBar={infoBar} setDate={setDate} currencyCode={currencyCode} />
            </div>
            {isLoadingBar || isLoadingCard ? <LoadingOverlay /> : null}
        </StatsLayout>
    )
}

export default FinancialLayout
