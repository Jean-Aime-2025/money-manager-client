import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { toast } from "sonner";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";
import moment from "moment";
import OverviewCard from "../components/OverviewCard";
import ListComponent from "../components/ListComponent";

const Expense = () => {
    const [expenseData, setExpenseData] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    })

    const fetchExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);

            if (response.status === 200) {
                const data = Array.isArray(response.data) ? response.data : [];
                setExpenseData(data)
            }
        } catch (error) {
            console.error('Failed to fetch expense details', error);
            toast.error(
                error.response?.data?.message ||
                "Failed to fetch expense details"
            );
        }
    }

    const fetchExpenseCategories = async () => {
        if (loading) return;

        setLoading(true)

        try {
            const res = await axiosConfig.get(API_ENDPOINTS.GET_CATEGORY_BY_TYPE("expense"))
            if (res.status === 200) {
                setCategories(res.data)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch expense categories")
        } finally {
            setLoading(false)
        }
    }

    const handleAddExpense = async (expense) => {
        const { name, amount, date, icon, categoryId } = expense;

        if (!name.trim()) {
            toast.error('Please enter a name')
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0")
            return;
        }

        if (!date) {
            toast.error("Please select a date")
            return;
        }

        const today = new Date().toISOString().split('T')[0]

        if (date > today) {
            toast.error('Date cannot be in the future')
            return;
        }

        if (!categoryId) {
            toast.error("Please select a category")
            return;
        }

        try {
            const res = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            })
            if (res.status === 201) {
                setOpenAddExpenseModal(false)
                toast.success("Expense added successfully");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        } catch (error) {
            console.error("Error creating expense:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to create expense"
            );
        }
    }

    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id))
            setOpenDeleteAlert({ show: false, data: null })
            toast.success("Expense deleted successfully")
            fetchExpenseDetails()
        } catch (error) {
            console.error("Error deleting expense:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete expense"
            );
        }
    }

    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, { responseType: "blob" })
            let filename = "expense_details.xlsx"
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", filename)
            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link)
            window.URL.revokeObjectURL(url)
            toast.success("Download expense details successful");
        } catch (error) {
            console.error('Error downloading expense details', error)
            toast.error(error.response?.data?.message || "Failed to download expense")
        }
    }

    const handleEmailExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
            if (response.status === 200) {
                toast.success("Expense details emailed successfully")
            }
        } catch (error) {
            console.error('Error emailing expense details', error)
            toast.error(error.response?.data?.message || "Failed to email expense")
        }
    }

    useEffect(() => {
        fetchExpenseDetails()
        fetchExpenseCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="my-5 mx-auto">
            <div className="my-6">
                <OverviewCard
                    title={'Expense Overview'}
                    subtitle={'Track your spending overtime and analyze your expense trends'}
                    transactions={expenseData}
                    loading={loading}
                    onAddExpense={() => setOpenAddExpenseModal(true)}
                    addButtonText={'Add Expense'}
                    type={'expense'}
                />
            </div>
            <ListComponent
                title={'Expense Sources'}
                type={'expense'}
                empty_text={'No expenses added yet. Add some to get started!'}
                transactions={expenseData}
                onDelete={(expense) =>
                    setOpenDeleteAlert({
                        show: true,
                        data: expense
                    })
                }
                listLoading={loading}
                onDownload={handleDownloadExpenseDetails}
                onEmail={handleEmailExpenseDetails}
            />

            <Modal
                isOpen={openAddExpenseModal}
                onClose={() => setOpenAddExpenseModal(false)}
                title={'Add Expense'}
            >
                <AddExpenseForm
                    onAddExpense={(expense) => handleAddExpense(expense)}
                    categories={categories}
                />
            </Modal>

            <Modal
                isOpen={openDeleteAlert.show}
                onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                title={'Delete Expense'}
            >
                <DeleteAlert
                    content={
                        <>
                            Are you sure you want to delete this expense{" "}
                            <span className="text-red-500 font-semibold">
                                {openDeleteAlert.data?.name}
                            </span>{" "}
                            created at{" "}
                            <span className="text-blue-500 font-semibold">
                                {moment(openDeleteAlert.data?.date).format('Do MMM YYYY')}
                            </span>
                            ?
                        </>
                    }
                    onDelete={() => deleteExpense(openDeleteAlert.data.id)}
                />
            </Modal>
        </div>
    )
}

export default Expense;