import "./DataTable.css"

function DataTable({ data, columns }) {
    return (
        <div className="shared-data-table">
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} className="shared-data-table-head">{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            {columns.map((column) => (
                                <td key={column.key} className="shared-data-table-cell">{item[column.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable