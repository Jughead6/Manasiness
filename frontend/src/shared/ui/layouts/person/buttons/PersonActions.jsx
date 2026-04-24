import "./PersonActions.css"
import { StepForward, StepBack } from "lucide-react"

function PersonActions({ currentPage, totalPage, onPrevPage, onNextPage }) {
    const visibleTotalPage = totalPage > 0 ? totalPage : 1

    return (
        <div className="shared-person-actions">
            <button type="button" onClick={onPrevPage} disabled={currentPage <= 1}><StepBack /></button>
            <p>Page {currentPage} of {visibleTotalPage}</p>
            <button type="button" onClick={onNextPage} disabled={currentPage >= totalPage || totalPage === 0}><StepForward /></button>
        </div>
    )
}

export default PersonActions
