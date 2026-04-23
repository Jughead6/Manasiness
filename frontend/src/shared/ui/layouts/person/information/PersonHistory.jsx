import "./PersonHistory.css"

function PersonHistory({ data, columns, emptyMessage = "No records found" }) {
    const hasRows = Array.isArray(data) && data.length > 0

    return (
        <div className="shared-person-history">
            <div className="shared-person-history-table">
                <table>
                    <thead>
                        <tr>
                            {columns.map((item, index) => (
                                <th className="shared-person-table-head" key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {!hasRows ? (
                            <tr>
                                <td className="shared-person-table-cell shared-person-table-cell-message" colSpan={columns.length}>{emptyMessage}</td>
                            </tr>
                        ) : data.map((item, index) => (
                            <tr key={index}>
                                {item.map((reg, regIndex) => (
                                    <td className="shared-person-table-cell" key={regIndex}>{reg}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PersonHistory
