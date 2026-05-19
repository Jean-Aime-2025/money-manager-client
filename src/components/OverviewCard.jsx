import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { prepareLineChartData } from '../util/utils'
import CustomLineChart from './CustomLineChart'

const OverviewCard = ({
    title,
    subtitle,
    addButtonText,
    transactions,
    loading,
    type,
    onAddIncome,
    onAddExpense
}) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareLineChartData(transactions)
        setChartData(result)
    }, [transactions])

    return (
        <div className='card h-fit p-6'>
            <div className='flex flex-col gap-4'>

                <div className='flex items-start justify-between max-md:flex-col'>
                    <div>
                        <h5 className='text-lg font-bold'>
                            {title}
                        </h5>

                        <p className='text-gray-500 text-base font-medium mt-0.5'>
                            {subtitle}
                        </p>
                    </div>

                    <button
                        onClick={type === "income" ? onAddIncome : onAddExpense}
                        className="add-btn flex items-center gap-1 max-md:mt-2"
                    >
                        <Plus size={15} />
                        <span>{addButtonText}</span>
                    </button>
                </div>

                <div className='mt-5'>
                    <CustomLineChart
                        data={chartData}
                        height={500}
                        loading={loading}
                        type={type}
                    />
                </div>

            </div>
        </div>
    )
}

export default OverviewCard