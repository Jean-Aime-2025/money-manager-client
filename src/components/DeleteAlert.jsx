import { LoaderCircle, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

const DeleteAlert = ({ content, onDelete }) => {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {
            setLoading(true)
            await onDelete()
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <p className='text-sm'>{content}</p>
            <div className='flex justify-end mt-6'>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    type='button'
                    className='delete-btn disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {loading ? (
                        <div className='flex items-center gap-2'>
                            <LoaderCircle className='h-4 w-4 animate-spin' />
                            Deleting...
                        </div>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <Trash2 />
                            Delete
                        </div>
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert