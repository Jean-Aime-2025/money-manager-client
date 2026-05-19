import { useContext } from "react"
import MenuBar from "./Menubar"
import { AppContext } from "../context/AppContext"
import Sidebar from "./Sidebar"

const Dashboard = ({ children, activeMenu }) => {
  const { user } = useContext(AppContext)

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <MenuBar activeMenu={activeMenu} />

      {user && (
        <div className="flex flex-1 overflow-hidden">
          <div className="max-[1080px]:hidden">
            <Sidebar activeMenu={activeMenu} />
          </div>

          {/* ONLY THIS AREA SHOULD SCROLL */}
          <div className="flex-1 overflow-y-auto mx-5">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard