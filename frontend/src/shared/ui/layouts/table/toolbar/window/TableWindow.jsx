import "./TableWindow.css"
import { StepForward, StepBack } from "lucide-react"

function TableWindow({ label, hasOlder, hasNewer, onOlder, onNewer }) {
    return (
        <div className="shared-table-window">
            <button type="button" onClick={onOlder} disabled={!hasOlder}><StepBack /></button>
            <p>{label || "No date"}</p>
            <button type="button" onClick={onNewer} disabled={!hasNewer}><StepForward /></button>
        </div>
    )
}

export default TableWindow
