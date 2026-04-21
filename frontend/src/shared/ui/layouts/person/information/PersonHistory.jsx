import "./PersonHistory.css"

function PersonHistory({ data, columns }) {
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
                        {data.map((item, index) => (
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