import { useContext } from "react"
import { AppContext } from "../context/AppContext"

const Sidebar = () => {
    const { user } = useContext(AppContext);

    return (
        <div>Sidebar</div>
    )
}

export default Sidebar