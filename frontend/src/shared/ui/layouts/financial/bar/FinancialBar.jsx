import "./FinancialBar.css"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { formatCurrency } from "../../../../utils/currency.js"

function FinancialBar({ infoBar = [], setDate, currencyCode = "PEN" }) {
    function getBarColor(value) {
        const safeValue = Math.max(-100, Math.min(100, value))
        const hue = ((safeValue + 100) / 200) * 120
        return `hsl(${hue}, 80%, 45%)`
    }

    if (!infoBar.length) {
        return <div className="shared-financial-bar">No chart data found for this range.</div>
    }

    return (
        <div className="shared-financial-bar">
            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={infoBar}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => formatCurrency(value, currencyCode)} />
                    <Tooltip formatter={(value) => formatCurrency(value, currencyCode)} />
                    <Bar dataKey="total" radius={[10, 10, 0, 0]}>
                        {infoBar.map((item, index) => (
                            <Cell key={index} fill={getBarColor(item.total)} onClick={() => setDate(item.day)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default FinancialBar
