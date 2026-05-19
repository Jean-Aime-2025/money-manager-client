import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { toast } from "sonner";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import moment from "moment";
import OverviewCard from "../components/OverviewCard";
import ListComponent from "../components/ListComponent";

const Income = () => {
    const [incomeData, setIncomeData] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    })

    const fetchIncomeDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);

            if (response.status === 200) {
                const data = Array.isArray(response.data) ? response.data : [];
                setIncomeData(data)
            }
        } catch (error) {
            console.error('Failed to fetch income details', error);
            toast.error(
                error.response?.data?.message ||
                "Failed to fetch income details"
            );
        }
    }

    const fetchIncomeCategories = async () => {
        if (loading) return;

        setLoading(true)

        try {
            const res = await axiosConfig.get(API_ENDPOINTS.GET_CATEGORY_BY_TYPE("income"))
            if (res.status === 200) {
                setCategories(res.data)
            }
        } catch (error) {
            toast.error(error.data?.message | "Failed to fetch income categories")
        } finally {
            setLoading(false)
        }
    }

    const handleAddIncome = async (income) => {
        const { name, amount, date, icon, categoryId } = income;

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
            const res = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            })
            if (res.status === 201) {
                setOpenAddIncomeModal(false)
                toast.success("Income added successfully");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }
        } catch (error) {
            console.error("Error create income:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to create income"
            );
        }
    }

    const deleteIncome = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id))
            setOpenDeleteAlert({ show: false, data: null })
            toast.success("Income deleted successfully")
            fetchIncomeDetails()
        } catch (error) {
            console.error("Error deleting income:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete income"
            );
        }
    }

    const handleDownloadIncomeDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, { responseType: "blob" })
            let filename = "income_details.xlsx"
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", filename)
            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link)
            window.URL.revokeObjectURL(url)
            toast.success("Download income details successful");
        } catch (error) {
            console.error('Error downloading income details', error)
            toast.error(error.response?.data?.message | "Failed to download income")
        }
    }

    const handleEmailIncomeDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
            if (response === 200) {
                toast.success("Income details emailed successfully")
            }
        } catch (error) {
            console.error('Error emailing income details', error)
            toast.error(error.response?.data?.message | "Failed to email income")
        }
    }


    useEffect(() => {
        fetchIncomeDetails()
        fetchIncomeCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="my-5 mx-auto">
            <div className="my-6">
                <OverviewCard
                    title={'Income Overview'}
                    subtitle={'Track your earning overtime and analyze your income trends'}
                    transactions={incomeData}
                    loading={loading}
                    onAddIncome={() => setOpenAddIncomeModal(true)}
                    addButtonText={'Add Income'}
                    type={'income'}
                />
            </div>
            <ListComponent
                title={'Income Sources'}
                type={'income'}
                empty_text={'No incomes added yet. Add some to get started!'}
                transactions={incomeData}
                onDelete={(income) =>
                    setOpenDeleteAlert({
                        show: true,
                        data: income
                    })
                }
                listLoading={loading}
                onDownload={handleDownloadIncomeDetails}
                onEmail={handleEmailIncomeDetails}
            />

            <Modal
                isOpen={openAddIncomeModal}
                onClose={() => setOpenAddIncomeModal(false)}
                title={'Add Income'}
            >
                <AddIncomeForm
                    onAddIncome={(income) => handleAddIncome(income)}
                    categories={categories}
                />
            </Modal>

            <Modal
                isOpen={openDeleteAlert.show}
                onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                title={'Delete Income'}
            >
                <DeleteAlert
                    content={
                        <>
                            Are you sure you want to delete this income{" "}
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
                    onDelete={() => deleteIncome(openDeleteAlert.data.id)}
                />
            </Modal>
        </div>
    )
}

export default Income;