import "./TableActions.css"
import { StepForward, StepBack } from "lucide-react"

function TableActions({ currentPage, totalPage, onPrevPage, onNextPage }) {
    return (
        <div className="shared-table-actions">
            {currentPage > 1 ? <button type="button" onClick={onPrevPage}><StepBack /></button> : null}
            {currentPage < totalPage ? <button type="button" onClick={onNextPage}><StepForward /></button> : null}
        </div>
    )
}

export default TableActions
