import './toolbar.css'

import TableFilter from './filter/tablefilter'
import TableButtons from './button/tablebuttons'

function ToolBarTable() {
    return (
        <div className="layout-toolbar">
            <TableFilter />
            <TableButtons />
        </div>
    )
}

export default ToolBarTable