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
    const [date, setDate] = useState("")
    const [infoCard, setInfoCard] = useState(emptyInfoCard)
    const [offset, setOffset] = useState(0)
    const [period, setPeriod] = useState("week")
    const [hasOlder, setHasOlder] = useState(false)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [isLoadingBar, setIsLoadingBar] = useState(true)
    const [isLoadingCard, setIsLoadingCard] = useState(false)

    const titlesCard = {
        total: "Total Expenses",
        totalsub1: "Staff Expenses",
        totalsub2: "Orders Expenses"
    }

    useEffect(() => {
        async function fetchInfoCard() {
            if (!date) {
                setInfoCard(emptyInfoCard)
                return
            }

            try {
                setIsLoadingCard(true)
                const data = await getInfoCard({ date, period })
                setInfoCard(expensesByDayMapper(data))
            } catch {
                setInfoCard(emptyInfoCard)
            } finally {
                setIsLoadingCard(false)
            }
        }

        fetchInfoCard()
    }, [date, period])

    useEffect(() => {
        async function fetchExpenses() {
            try {
                setIsLoadingBar(true)
                const data = await getInfoBar({ offset, period })
                const mapped = expensesMapper(data)

                setInfoBar(mapped)
                setHasOlder(data[0]?.has_older ?? false)
                setStartDate(data[0]?.start_date ? String(data[0].start_date).split("T")[0] : null)
                setEndDate(data[0]?.end_date ? String(data[0].end_date).split("T")[0] : null)

                if (!mapped.length) {
                    setDate("")
                    return
                }

                setDate((prev) => {
                    const stillExists = mapped.some((item) => item.day === prev)
                    return stillExists ? prev : mapped[mapped.length - 1].day
                })
            } catch {
                setInfoBar([])
                setHasOlder(false)
                setStartDate(null)
                setEndDate(null)
                setDate("")
            } finally {
                setIsLoadingBar(false)
            }
        }

        fetchExpenses()
    }, [offset, period])

    return (
        <FinancialLayout 
            infoBar={infoBar}
            date={date}
            setDate={setDate}
            infoCard={infoCard}
            titlesCard={titlesCard}
            title="Expenses"
            description="On this page, you can view your expenses in a more organized and straightforward way. Select a bar and check the information."
            hasOlder={hasOlder}
            offset={offset}
            setOffset={setOffset}
            startDate={startDate}
            endDate={endDate}
            period={period}
            setPeriod={setPeriod}
            isLoadingBar={isLoadingBar}
            isLoadingCard={isLoadingCard}
        />
    )
}

export default ExpensesPage
