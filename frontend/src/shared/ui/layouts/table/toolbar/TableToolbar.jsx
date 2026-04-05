import './TableToolbar.css'

import TableFilter from './filter/TableFilter'
import TableActions from './button/TableActions'

function TableToolbar({onCreateClick}) {
    return (
        <div className="shared-table-toolbar">
            <TableFilter/>
            <TableActions onClick={onCreateClick}/>
        </div>
    )
}

export default TableToolbar
