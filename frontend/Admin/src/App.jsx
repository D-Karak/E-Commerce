import React, { useEffect,useState } from "react"
import Signup from "./pages/signup"
import Signin from "./pages/signin"
import AdminDashboard from "./pages/adminDashboard"
import { AuthProvider } from "./context/authContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RoleRoutes from "./routes/RoleRoutes"
import Category from "./components/category"
import Product from "./components/Product"
import Orders from "./components/Orders"

function App() {


  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signin />}/>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/admindashboard" element={<RoleRoutes allowedRoles={['Admin']}><AdminDashboard /></RoleRoutes>}>
          {/* nasted routes ex. /admindashboard/category */}
          <Route path="category" element={<Category />} />
          <Route path="product" element={<Product />} />
          <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App