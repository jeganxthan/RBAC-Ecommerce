import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import PrivateRoute from './Routes/PrivateRoute';
import Loader from './Lazy/Loader';

// Lazy load pages
const Home = lazy(() => import('./components/section/Home'));
const AdminDashboard = lazy(() => import('./Pages/Admin/AdminDashboard'));
const AdminSeller = lazy(() => import('./Pages/Admin/AdminSeller'));
const SellerDashboard = lazy(() => import('./Pages/Seller/SellerDashboard'));
const UserPage = lazy(() => import('./Pages/User/UserPage'));

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* admin protected route */}
            <Route element={<PrivateRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/seller" element={<AdminSeller />} />
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
        </Suspense>
      </Router>
    </UserProvider>
  );
};

export default App;
