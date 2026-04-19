import "./FinancialToolbar.css"
import { StepForward, StepBack } from "lucide-react"

function FinancialToolbar() {
    return (
        <div className="shared-financial-toolbar">
            <button><StepBack/></button>
            <p>2026/04/06 - 2026/04/12</p>
            <button><StepForward/></button>
        </div>
    )
}

export default FinancialToolbar