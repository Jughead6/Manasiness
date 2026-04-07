import "./PersonHistory.css"

function PersonHistory({ data, columns, sectionTitle }) {
    return (
        <div className="shared-person-history">
            <h2>{sectionTitle}</h2>
            <table>
                <thead>
                    <tr>
                        {columns.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {item.map((reg, regIndex) => (
                                <td key={regIndex}>{reg}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PersonHistory