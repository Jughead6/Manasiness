import { useEffect, useState } from "react"
import { getIncome, getInfoCard } from "../api/income.api.js"
import { incomeMapper, incomeByDayMapper } from "../mappers/income.mapper.js"
import FinancialLayout from "../../../shared/ui/layouts/financial/FinancialLayout.jsx"

const emptyInfoCard = {
    total: 0,
    totalsub1: 0,
    totalsub2: 0
}

function IncomePage() {
    const [infoBar, setInfoBar] = useState([])
    const [date, setDate] = useState(null)
    const [infoCard, setInfoCard] = useState(emptyInfoCard)
    const [offset, setOffset] = useState(0)
    const [hasOlder, setHasOlder] = useState(false)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    

    const titlesCard = {
        total: "Total Income",
        totalsub1: "Total Spent",
        totalsub2: "Total Earned"
    }

    useEffect(() => {
        async function fetchInfoCard() {
            if (!date) {
                setInfoCard(emptyInfoCard)
                return
            }
            try {
                const data = await getInfoCard(date)
                setInfoCard(incomeByDayMapper(data))
            } catch {
                setInfoCard(emptyInfoCard)
            }
        }
        fetchInfoCard()
    }, [date])

    useEffect(() => {
        async function fetchIncome() {
            try {
                const data = await getIncome(offset)
                setInfoBar(incomeMapper(data))
                setHasOlder(data[0]?.has_older ?? false)
                setStartDate(data[0]?.start_date ? String(data[0].start_date).split("T")[0] : null)
                setEndDate(data[0]?.end_date ? String(data[0].end_date).split("T")[0] : null)
                
            } catch {
                setInfoBar([])
                setHasOlder(false)
                setStartDate(null)
                setEndDate(null)
            }
        }

        fetchIncome()
    }, [offset])

    return (
        <FinancialLayout 
            infoBar={infoBar} 
            date={date} 
            setDate={setDate} 
            infoCard={infoCard} 
            titlesCard={titlesCard}
            title="Income"
            description="On this page, you can view your income in a more organized and straightforward way. Select a day on the graph and check the information!"
            hasOlder={hasOlder}
            offset={offset}
            setOffset={setOffset}
            startDate={startDate}
            endDate={endDate}
        />
    )
}

export default IncomePage
