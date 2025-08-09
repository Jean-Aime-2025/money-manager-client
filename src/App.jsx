import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Income from "./pages/Income"
import Expense from "./pages/Expense"
import Category from "./pages/Category"
import Filter from "./pages/Filter"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Toaster } from "sonner"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/category" element={<Category />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App