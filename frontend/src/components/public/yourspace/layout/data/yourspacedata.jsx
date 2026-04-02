import './yourspacedata.css'

function YourSpaceData({ data, user }) {
    return (
        <div id="yourspace-data">
            <table>
                <thead>
                    <tr>
                        <th className="table-head">Date</th>
                        <th className="table-head">Product</th>
                        <th className="table-head">{user}</th>
                        <th className="table-head">Price</th>
                        <th className="table-head">Quantity</th>
                        <th className="table-head">State</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="table-body">{item.date}</td>
                            <td className="table-body">{item.product}</td>
                            <td className="table-body">{item[user]}</td>
                            <td className="table-body">{item.price}</td>
                            <td className="table-body">{item.quantity}</td>
                            <td className="table-body">{item.state}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default YourSpaceData