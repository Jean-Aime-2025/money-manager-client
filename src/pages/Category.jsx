import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { toast } from "sonner";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
    const [loading, setLoading] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false)
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedType, setSelectedType] = useState("all");

    const fetchCategoryDetails = async (type = "all") => {
        if (loading) return;

        setLoading(true);

        try {
            let response;

            if (type === "all") {
                response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            } else {
                response = await axiosConfig.get(
                    API_ENDPOINTS.GET_CATEGORY_BY_TYPE(type)
                );
            }

            if (response.status === 200) {
                setCategoryData(response.data);
            }
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryDetails(selectedType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedType]);

    const handleAddCategory = async (category) => {
        const { name, type, icon } = category;

        const trimmedName = name?.trim();

        if (!trimmedName) {
            toast.error("Category name is required");
            return;
        }

        if (!type) {
            toast.error("Category type is required");
            return;
        }

        const isDuplicate = categoryData.some((cat) => {
            return cat.name.toLowerCase() === trimmedName.toLowerCase();
        });

        if (isDuplicate) {
            toast.error("Category name already exists");
            return;
        }

        try {
            const response = await axiosConfig.post(
                API_ENDPOINTS.ADD_CATEGORY,
                { name: trimmedName, type, icon }
            );

            if (response.status === 201) {
                toast.success("Category added successfully!");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        } catch (error) {
            console.error("Add category error:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to add category"
            );
        }
    };

    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit)
        setOpenEditCategoryModal(true)
    }

    const handleUpdateCategory = async (category) => {
        const { id, name, type, icon } = category;

        const trimmedName = name?.trim();

        if (!trimmedName) {
            toast.error("Category name is required");
            return;
        }

        if (!id) {
            toast.error("Category ID is missing");
            return;
        }

        try {
            const response = await axiosConfig.put(
                API_ENDPOINTS.UPDATE_CATEGORY(id),
                {
                    name: trimmedName,
                    type,
                    icon
                }
            );

            if (response.status === 200) {
                setOpenEditCategoryModal(false);
                setSelectedCategory(null);

                toast.success("Category updated successfully");

                fetchCategoryDetails();
            }
        } catch (error) {
            console.error("Error updating category:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update category"
            );
        }
    };

    return (
        <div className="my-5 mx-auto">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">Categories</h2>
                <button
                    onClick={() => setOpenAddCategoryModal(true)}
                    className="add-btn flex items-center gap-1">
                    <Plus size={15} />
                    <span>Add Category</span>
                </button>
            </div>
            <CategoryList
                categories={categoryData}
                loading={loading}
                onEditCategory={handleEditCategory}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />
            <Modal
                isOpen={openAddCategoryModal}
                onClose={() => setOpenAddCategoryModal(false)}
                title={'Add Category'}
            >
                <AddCategoryForm onAddCategory={handleAddCategory} />
            </Modal>

            <Modal
                isOpen={openEditCategoryModal}
                onClose={() => {
                    setOpenEditCategoryModal(false)
                    setSelectedCategory(null)
                }
                }
                title={'Edit Category'}
            >
                <AddCategoryForm
                    initialCategoryData={selectedCategory}
                    onAddCategory={handleUpdateCategory}
                    isEditing={true}
                />
            </Modal>
        </div>
    )
}

export default Category;