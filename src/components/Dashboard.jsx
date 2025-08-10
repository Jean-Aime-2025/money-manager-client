import { useContext } from "react"
import MenuBar from "./MenuBar"
import { AppContext } from "../context/AppContext"
import Sidebar from "./Sidebar"

const Dashboard = () => {
  const {user} = useContext(AppContext)
  return (
    <div><MenuBar />
{user &&(
  <div className="flex">
    <div className="max-[1080px]:hidden">
      <Sidebar/>
    </div>
    <div className="grow mx-5">Right side content</div>
  </div>
)}
    </div>
  )
}

export default Dashboard