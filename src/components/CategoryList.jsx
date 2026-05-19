import { Layers2, Pencil } from "lucide-react";

const CategoryList = ({ categories, loading, onEditCategory, selectedType, setSelectedType }) => {
    return (
        <div className="card p-4">
            <div className="flex items-center justify-between gap-5 mb-4">
                <h4 className="text-lg font-semibold">Category Sources</h4>

                <div className="flex gap-2">
                    {["all", "income", "expense"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-3 py-1 rounded-full text-sm border transition capitalize ${selectedType === type
                                ? "bg-primary text-white"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* LOADING STATE */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="h-14 w-full bg-gray-100 animate-pulse rounded-lg"
                        />
                    ))}
                </div>
            ) : categories.length === 0 ? (
                <p className="text-gray-500">
                    No categories added yet. Add some to get started!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60"
                        >
                            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full border border-gray-200/50">
                                {category.icon ? (
                                    <img
                                        src={category.icon}
                                        alt={category.name}
                                        className="h-5 w-5"
                                    />
                                ) : (
                                    <Layers2 className="text-primary" size={24} />
                                )}
                            </div>

                            <div className="flex-1 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 font-medium">
                                        {category.name}
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1 capitalize font-medium">
                                        {category.type}
                                    </p>
                                </div>

                                <button
                                    onClick={() => onEditCategory(category)}
                                    className="text-gray-400 bg-gray-100 rounded-full p-3 border hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                >
                                    <Pencil size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryList;