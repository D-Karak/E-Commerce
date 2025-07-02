import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SignUp from './pages/SignUp/signup'
import SignIn from './pages/SignUp/signin'
import PageBody from './pages/Home/PageBody';
import Products from './pages/Products/products'
import CartPage from './pages/Cart/Cart';
import CheckOut from './pages/CheckOut/CheckOut'
import { AuthProvider } from './context/authContext';
import { WishlistProvider } from './context/WishlistContext';
import {ReviewProvider } from './context/ReviewContext';
import Success from './pages/CheckOut/SuccessPage'
import Failure from './pages/CheckOut/FailurePage'
import MyWishlist from './components/MyWishlist';
import MyOrders from './components/MyOrders';
import ProductDetails from './components/ProductDetails';
import ReviewPage from './components/ReviewPage';
function App() {


  return (
    <>
      <AuthProvider>
        <ReviewProvider>
        <WishlistProvider>
        <Router>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/' element={<Layout />}>
              <Route index element={<PageBody />} />
              <Route path='cart' element={<CartPage />} />
              <Route path='products' element={<Products />} />
              <Route path='checkout' element={<CheckOut />} />
              <Route path='success' element={<Success />} />
              <Route path='failed' element={<Failure />} />
              <Route path='/Wishlist' element={<MyWishlist/>}/>
              <Route path='/orders' element={<MyOrders/>}/>
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/review/:orderId" element={<ReviewPage />} />
            </Route>
          </Routes>
        </Router>
        </WishlistProvider>
        </ReviewProvider>
      </AuthProvider>
    </>
  )
}

export default App
