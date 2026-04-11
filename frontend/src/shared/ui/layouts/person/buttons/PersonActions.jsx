import "./PersonActions.css"
import { StepForward, StepBack } from "lucide-react"

function PersonActions({ currentPage, totalPage, onPrevPage, onNextPage }) {
    return (
        <div className="shared-person-actions">
            {currentPage > 1 ? <button type="button" onClick={onPrevPage}><StepBack /></button> : null}
            {currentPage < totalPage ? <button type="button" onClick={onNextPage}><StepForward /></button> : null}
        </div>
    )
}

export default PersonActions
