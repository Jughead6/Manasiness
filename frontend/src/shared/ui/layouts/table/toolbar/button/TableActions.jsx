import './TableActions.css'

function TableActions({ onClick }) {
    return (
        <div className="shared-table-actions">
            <button onClick={onClick}>Register</button>
        </div>
    )
}

export default TableActions