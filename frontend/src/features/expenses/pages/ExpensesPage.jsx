import { useEffect, useState } from "react"
import { getInfoBar, getInfoCard } from "../api/expenses.api.js"
import { expensesMapper, expensesByDayMapper } from "../mappers/expenses.mapper.js"
import FinancialLayout from "../../../shared/ui/layouts/financial/FinancialLayout.jsx"

const emptyInfoCard = {
    total: 0,
    totalsub1: 0,
    totalsub2: 0
}

function ExpensesPage() {
    const [infoBar, setInfoBar] = useState([])
    const [date, setDate] = useState(null)
    const [infoCard, setInfoCard] = useState(emptyInfoCard)

    const titlesCard = {
        total: "Total Expenses",
        totalsub1: "Orders Expenses",
        totalsub2: "Staff Expenses"
    }

    useEffect(() => {
        async function fetchInfoCard() {
            if (!date) {
                setInfoCard(emptyInfoCard)
                return
            }
            try {
                const data = await getInfoCard(date)
                setInfoCard(expensesByDayMapper(data))
            } catch {
                setInfoCard(emptyInfoCard)
            }
        }
        fetchInfoCard()
    }, [date])

    useEffect(() => {
        async function fetchIncome() {
            try {
                const data = await getInfoBar()
                setInfoBar(expensesMapper(data))
            } catch {
                setInfoBar([])
            }
        }

        fetchIncome()
    }, [])

    return (
        <FinancialLayout 
            infoBar={infoBar} 
            date={date} 
            setDate={setDate} 
            infoCard={infoCard} 
            titlesCard={titlesCard}
            title="Expenses"
            description="On this page, you can view your expenses in a more organized and straightforward way. Select a day on the graph and check the information!"
        />
    )
}

export default ExpensesPage
