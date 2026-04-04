import './TableToolbar.css'

import TableFilter from './filter/TableFilter'
import TableActions from './button/TableActions'

function TableToolbar() {
    return (
        <div className="shared-table-toolbar">
            <TableFilter />
            <TableActions />
        </div>
    )
}

export default TableToolbar
