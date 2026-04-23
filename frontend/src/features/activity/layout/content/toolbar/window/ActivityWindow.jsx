import "./ActivityWindow.css"
import { StepForward, StepBack } from "lucide-react"

function ActivityWindow({ label, offset, setOffset, hasOlder }) {
    return (
        <div className="activity-window">
            <button type="button" onClick={() => setOffset(offset + 1)} disabled={!hasOlder}><StepBack /></button>
            <p>{label || "No range available"}</p>
            <button type="button" onClick={() => setOffset(offset - 1)} disabled={offset === 0}><StepForward /></button>
        </div>
    )
}

export default ActivityWindow
