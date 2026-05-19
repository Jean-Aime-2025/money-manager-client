import React, { useEffect, useState } from 'react'
import Input from './Input'
import EmojiPickerPopUp from './EmojiPickerPopUp'
import { API_ENDPOINTS } from '../util/apiEndpoints'
import { LoaderCircle, Pencil, Plus } from 'lucide-react'

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon: ""
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory(initialCategoryData)
        } else {
            setCategory({ name: "", type: "", icon: "" })
        }
    }, [isEditing, initialCategoryData])

    const categoryTypeOptions = [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" },
    ]

    const handleChange = (key, value) => {
        setCategory((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            await onAddCategory(category)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='p-4'>
            <EmojiPickerPopUp
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={category.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label={'Category name'}
                placeholder={'e.g, Freelance, Salary, Groceries'}
                type={'text'}
            />

            <Input
                label={'Category type'}
                value={category.type}
                onChange={({ target }) => handleChange("type", target.value)}
                isSelect={true}
                options={categoryTypeOptions}
            />

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    disabled={loading}
                    onClick={handleSubmit}
                    className='add-btn delete-btn disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {loading ? (
                        <div className='flex gap-2 items-center'>
                            <LoaderCircle className='w-4 h-4 animate-spin' />
                            {isEditing ? 'Updating ...' : 'Adding ...'}
                        </div>
                    ) : (
                        <div className='flex gap-2 items-center'>

                            {isEditing ? (
                                <Pencil />
                            ) : (

                                <Plus />
                            )}
                            {isEditing ? (

                                <>Update Category</>
                            ) : (
                                <>Add Category</>
                            )}
                        </div>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddCategoryForm