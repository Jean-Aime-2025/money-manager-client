import React, { useEffect, useState } from 'react'
import EmojiPickerPopUp from './EmojiPickerPopUp'
import Input from './Input'
import { LoaderCircle, Plus } from 'lucide-react'

const AddIncomeForm = ({ onAddIncome, categories }) => {
    const [income, setIncome] = useState({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: ""
    })

    const [loading, setLoading] = useState(false)

    const categoryOptions = categories.map((category) => (
        {
            value: category.id,
            label: category.name
        }
    ))

    const handleChange = (key, value) => {
        setIncome({ ...income, [key]: value })
    }

    const handleAddIncome = async () => {
        setLoading(true)
        try {
            await onAddIncome(income)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (categories.length > 0 && !income.categoryId) {
            setIncome((prev) => ({
                ...prev,
                categoryId: categories[0].id
            }))
        }
    }, [categories, income.categoryId])

    return (
        <div>
            <EmojiPickerPopUp
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input
                value={income.name}
                onChange={({ target }) => handleChange('name', target.value)}
                label={'Income Source'}
                placeholder={'e.g: Salary,Freelance, Bonus'}
            />

            <Input
                label={'Caategory'}
                value={income.categoryId}
                onChange={({ target }) => handleChange('categoryId', target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange('amount', target.value)}
                label={'Amount'}
                placeholder={'e.g: 500.00'}
                type={'number'}
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange('date', target.value)}
                label={'Date'}
                placeholder={''}
                type={'date'}
            />

            <div className='flex justify-end mt-6'>
                <button
                    onClick={handleAddIncome}
                    disabled={loading}
                    className='add-btn disabled:opacity-50 disabled:cursor-not-allowed'
                >

                    {loading ? (
                        <div className='flex gap-2 items-center'>
                            <LoaderCircle className='w-4 h-4 animate-spin' />
                            Adding ...
                        </div>
                    ) : (
                        <div className='flex gap-2 items-center'>
                            <Plus />
                            Add Income
                        </div>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm