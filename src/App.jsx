import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Pages/Navbar'
import Register from './Components/Register'
import Login from './Components/Login'
import ProtectedRoutes from './Utils/ProtectedRoutes'
import List from './Components/List'
import AddProduct from './Components/AddProduct'
import EditProduct from './Components/EditProduct'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/list" element={<List />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
