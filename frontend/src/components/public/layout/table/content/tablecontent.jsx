import './tablecontent.css'

function TableContent({ data, columns }) {
    return (
        <div className="table-content">
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} className="table-head">{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            {columns.map((column) => (
                                <td key={column.key} className="table-body">{item[column.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableContent