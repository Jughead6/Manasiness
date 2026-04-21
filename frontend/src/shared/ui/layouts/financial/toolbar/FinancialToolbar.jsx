import "./FinancialToolbar.css"
import { StepForward, StepBack } from "lucide-react"

function FinancialToolbar(data) {
    const { offset, setOffset, hasOlder, startDate, endDate } = data

    return (
        <div className="shared-financial-toolbar">
            { hasOlder ? <button onClick={() => setOffset(offset + 1)}><StepBack/></button> : null}
            <p>{startDate} to {endDate}</p>
            { offset === 0 ? null : <button onClick={() => setOffset(offset - 1)}><StepForward/></button> }
            
        </div>
    )
}

export default FinancialToolbar