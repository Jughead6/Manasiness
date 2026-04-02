import './layouttable.css'


import TableContent from './content/tablecontent'
import ToolBarTable from './toolbar/toolbar.jsx'


function LayoutTable({ data, columns }) {
    return (
        <div id="layout-table">
                <ToolBarTable/>
                <TableContent data={data} columns={columns} />
        </div>
    )
}

export default LayoutTable