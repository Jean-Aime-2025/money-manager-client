import { AppContext } from "../context/AppContext"
import { User } from "lucide-react";
import { SIDEBAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeMenu, handleCloseSidebar }) => {
    const navigate = useNavigate()

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
            {SIDEBAR_DATA.map((item, index) => (
                <button
                    onClick={() => {
                        navigate(item.path)
                        handleCloseSidebar()
                    }}
                    key={index}
                    className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer ${activeMenu == item.label ? "text-white bg-purple-800" : ""}`}>
                    <item.icon className="text-xl" />
                    {item.label}
                </button>
            ))}
        </div>
    )
}

export default Sidebar