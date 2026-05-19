import { Download, LoaderCircle, Mail } from 'lucide-react'
import React, { useState } from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const ListComponent = ({ transactions, onDelete, listLoading, onEmail, onDownload, title, empty_text, type }) => {
    const [emailLoading, setEmailLoading] = useState(false)
    const [downloadLoading, setDownloadLading] = useState(false)

    const handleEmail = async () => {
        try {
            setEmailLoading(true)
            await onEmail()
        } finally {
            setEmailLoading(false)
        }

    }

    const handleDownload = async () => {
        try {
            setDownloadLading(true)
            await onDownload()
        } finally {
            setDownloadLading(false)
        }
    }

    return (
        <div className="card p-4">
            <div className='flex sm:items-center sm:flex-row justify-between mb-4 flex-col'>
                <h5 className='text-lg font-bold'>{title}</h5>
                <div className='flex sm:items-center sm:justify-end gap-2 max-sm:mt-2'>
                    <button disabled={emailLoading} className='card-btn text-sm' onClick={handleEmail}>
                        {emailLoading ? (
                            <>
                                <LoaderCircle className='w-4 h-4 animate-spin' />
                                Emailing ...
                            </>
                        ) : (
                            <>
                                <Mail size={15} className='text-base' />Email
                            </>
                        )}

                    </button>
                    <button disabled={downloadLoading} className='card-btn text-sm' onClick={handleDownload}>
                        {downloadLoading ? (
                            <>
                                <LoaderCircle className='w-4 h-4 animate-spin' />
                                Downloading ...
                            </>
                        ) : (
                            <>
                                <Download size={15} className='text-base' />Download
                            </>
                        )}
                    </button>
                </div>
            </div>

            {listLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="h-14 w-full bg-gray-100 animate-pulse rounded-lg"
                        />
                    ))}
                </div>
            ) : transactions.length === 0 ? (
                <p className="text-gray-500 text-base">
                    {empty_text}
                </p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {transactions?.map((i) => (
                        <TransactionInfoCard
                            key={i.id}
                            title={i.name}
                            icon={i.icon}
                            date={moment(i.date).format('Do MMM YYYY')}
                            amount={i.amount}
                            type={type}
                            onDelete={() => onDelete(i)}
                            hideDeleteBtn={false}
                        />
                    ))}
                </div>)}
        </div>
    )
}

export default ListComponent