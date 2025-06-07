import React from 'react'
import Home from './components/section/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserProvider from './context/UserContext'
import PrivateRoute from './Routes/PrivateRoute'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import SellerDashboard from './Pages/Seller/SellerDashboard'
import UserPage from './Pages/User/UserPage'

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* admin protected route */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* seller protected route */}
          <Route element={<PrivateRoute allowedRoles={['seller']} />}>
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
          </Route>

          {/* user protected route */}
          <Route element={<PrivateRoute allowedRoles={['user']} />}>
            <Route path="/users" element={<UserPage />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
