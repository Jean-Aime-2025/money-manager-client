import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const RecentTransactions = ({ transactions, onMore, loading }) => {
    return (
        <div className='card p-5'>
            <div className='flex items-center justify-between'>
                <h4 className='text-lg'>Recent Transactions</h4>

                <button className='px-4 py-2 bg-gray-200 rounded-lg text-black hover:text-primary font-semibold flex items-center gap-2' onClick={onMore}>More <ArrowRight className='text-base' size={15} /></button>
            </div>

            {loading ? (
                <div className="flex flex-col gap-4 mt-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="h-14 w-full bg-gray-100 animate-pulse rounded-lg"
                        />
                    ))}
                </div>
            ) : (
                <div>
                    {transactions?.slice(0, 6).map(transaction => (
                        <TransactionInfoCard
                            key={transaction.id}
                            title={transaction.name}
                            icon={transaction.icon}
                            date={moment(transaction.date).format('Do MMM YYYY')}
                            amount={transaction.amount}
                            type={transaction.type}
                            hideDeleteBtn
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default RecentTransactions