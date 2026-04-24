import "./DataTable.css"

function DataTable({ data, columns, emptyMessage = "No records found" }) {
    const safeData = Array.isArray(data) ? data : []
    const safeColumns = Array.isArray(columns) ? columns : []
    const colspan = safeColumns.length || 1

    return (
        <div className="shared-data-table">
            <table>
                <thead>
                    <tr>
                        {safeColumns.map((column) => (
                            <th key={column.key} className="shared-data-table-head">{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {safeData.length ? (
                        safeData.map((item) => (
                            <tr key={item.id}>
                                {safeColumns.map((column) => (
                                    <td key={column.key} className="shared-data-table-cell">{item[column.key]}</td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="shared-data-table-cell shared-data-table-feedback" colSpan={colspan}>{emptyMessage}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable
