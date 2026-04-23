import "./TableActions.css"
import { StepForward, StepBack } from "lucide-react"

function TableActions({ currentPage, totalPage, onPrevPage, onNextPage }) {
    const safeTotalPage = totalPage > 0 ? totalPage : 1

    return (
        <div className="shared-table-actions">
            <button type="button" onClick={onPrevPage} disabled={currentPage <= 1}><StepBack /></button>
            <p>{currentPage} / {safeTotalPage}</p>
            <button type="button" onClick={onNextPage} disabled={currentPage >= totalPage || totalPage === 0}><StepForward /></button>
        </div>
    )
}

export default TableActions
