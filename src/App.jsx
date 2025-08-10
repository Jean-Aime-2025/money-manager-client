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

const App = () => {
  return (
    <>
      <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/category" element={<Category />} />
          <Route path="/filter" element={<Filter />} />
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