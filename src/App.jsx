import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Income from "./pages/Income"
import Expense from "./pages/Expense"
import Category from "./pages/Category"
import Filter from "./pages/Filter"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Toaster } from "sonner"
import NotFound from "./pages/NotFound"
import { AppContextProvider } from "./context/AppContext"
import Dashboard from "./components/Dashboard"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppContextProvider>
          <Routes>
            <Route path="/" element={<Dashboard activeMenu="Dashboard"><Home /></Dashboard>} />
            <Route path="/dashboard" element={<Dashboard activeMenu="Dashboard"><Home /></Dashboard>} />
            <Route path="/income" element={<Dashboard activeMenu="Income"><Income /></Dashboard>} />
            <Route path="/expense" element={<Dashboard activeMenu="Expense"><Expense /></Dashboard>} />
            <Route path="/category" element={<Dashboard activeMenu="Category"><Category /></Dashboard>} />
            <Route path="/filter" element={<Dashboard activeMenu="Filter"><Filter /></Dashboard>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppContextProvider>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App