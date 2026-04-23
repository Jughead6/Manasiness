import "./FinancialWindow.css"
import { StepForward, StepBack } from "lucide-react"

function FinancialWindow({ offset, setOffset, hasOlder, startDate, endDate }) {
    return (
        <div className="shared-financial-window">
            <button type="button" onClick={() => setOffset(offset + 1)} disabled={!hasOlder}><StepBack /></button>
            <p>{startDate && endDate ? `${startDate} to ${endDate}` : "No range available"}</p>
            <button type="button" onClick={() => setOffset(offset - 1)} disabled={offset === 0}><StepForward /></button>
        </div>
    )
}

export default FinancialWindow
