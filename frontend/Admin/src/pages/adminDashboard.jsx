import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext';
import { Link, Outlet } from 'react-router-dom';

function AdminDashboardPage() {
  const { user, logout } = useContext(AuthContext);
  console.log(user)

  return (
    
      <div className="bg-gray-100 min-h-screen flex">

        {/* Sidebar */}
        <aside className="w-64 bg-white min-h-screen shadow-md p-6">
          <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
          <nav className="flex flex-col space-y-4">
            <Link  className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to={'category'} className="text-gray-700 hover:text-blue-600">Category</Link>
            <Link  to={'product'} className="text-gray-700 hover:text-blue-600">Product</Link>
            <Link  to={'orders'} className="text-gray-700 hover:text-blue-600">Orders</Link>
            <button onClick={logout}  className="text-gray-700 hover:text-blue-600 text-left">Logout</button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-semibold mb-6">Welcome back  {user.user.name}!</h2>
         
         
        <Outlet/>
         
        
        </main>
      </div>

   
  )
}

export default AdminDashboardPage