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

    const titlesCard = {
        total: "Total Income",
        totalsub1: "Total Earned",
        totalsub2: "Total Spent"
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
                const data = await getIncome()
                setInfoBar(incomeMapper(data))
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
                title="Income"
                description="On this page, you can view your income in a more organized and straightforward way. Select a day on the graph and check the information!"
            />
    
    )
}

export default IncomePage
