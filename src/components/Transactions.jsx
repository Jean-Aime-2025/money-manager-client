import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'
import { ArrowRight } from 'lucide-react'

const Transactions = ({ transactions, onMore, type, loading, title }) => {
    return (
        <div className='card p-6'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>{title}</h5>
                <button className='px-4 py-2 bg-gray-200 rounded-lg text-black hover:text-primary font-semibold flex items-center gap-2' onClick={onMore}>More <ArrowRight className='text-base' size={15} /></button>
            </div>

            {loading ? (
                <div className="flex flex-col gap-4 mt-4">
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                        <div
                            key={item}
                            className="h-14 w-full bg-gray-100 animate-pulse rounded-lg"
                        />
                    ))}
                </div>
            ) : (
                <div className='mt-6'>
                    {transactions?.map((i) => (
                        <TransactionInfoCard
                            key={i.id}
                            title={i.name}
                            icon={i.icon}
                            date={moment(i.date).format('Do MMM YYYY')}
                            amount={i.amount}
                            type={type}
                            hideDeleteBtnF
                        />
                    ))}
                </div>
            )}

        </div>
    )
}

export default Transactions