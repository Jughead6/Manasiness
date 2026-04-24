import "./PersonHistoryWindow.css"
import { StepBack, StepForward } from "lucide-react"

function PersonHistoryWindow({ label, hasOlder, hasNewer, onOlder, onNewer }) {
    return (
        <div className="shared-person-history-window">
            <button type="button" onClick={onOlder} disabled={!hasOlder}>
                <StepBack />
            </button>
            <p>{label || "No day selected"}</p>
            <button type="button" onClick={onNewer} disabled={!hasNewer}>
                <StepForward />
            </button>
        </div>
    )
}

export default PersonHistoryWindow
