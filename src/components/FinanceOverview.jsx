import React from 'react'
import { addThousandsSeparator } from '../util/utils'
import CustomPieChart from './CustomPieChart'

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense, loading }) => {
    const COLORS = ["#59168B", "#a0090e", "#016630"]

    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Income", amount: totalIncome },
        { name: "Total Expense", amount: totalExpense },
    ]

    return (
        <div className='bg-white border border-gray-200/50 rounded-lg shadow-sm p-6 h-[560px]'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Financial Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total balance"
                totalAmount={`$${addThousandsSeparator(totalBalance)}`}
                colors={COLORS}
                showTextAnchor
                loading={loading}
            />
        </div>
    )
}

export default FinanceOverview