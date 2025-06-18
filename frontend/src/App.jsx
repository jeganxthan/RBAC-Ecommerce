import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import PrivateRoute from './Routes/PrivateRoute';
import Loader from './Lazy/Loader';
import AdminProducts from './Pages/Admin/AdminProducts';
import AdminLogout from './Pages/Admin/AdminLogout';
import SellerProduct from './Pages/Seller/SellerProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './Pages/Seller/Product/ProductDetails';
import ProductAdmin from './Pages/Admin/product/ProductAdmin'
const Home = lazy(() => import('./components/section/Home'));
const AdminDashboard = lazy(() => import('./Pages/Admin/AdminDashboard'));
const AdminSeller = lazy(() => import('./Pages/Admin/AdminSeller'));
const SellerDashboard = lazy(() => import('./Pages/Seller/SellerDashboard'));
const UserPage = lazy(() => import('./Pages/User/UserPage'));

const App = () => {
  return (
    <UserProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* admin protected route */}
            <Route element={<PrivateRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/seller" element={<AdminSeller />} />
              <Route path="/admin/seller-products" element={<AdminProducts />} />
              <Route path="/admin/product/:productId" element={<ProductAdmin/>} />
              <Route path="/admin/logout" element={<AdminLogout />} />
            </Route>

            {/* seller protected route */}
            <Route element={<PrivateRoute allowedRoles={['seller']} />}>
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
              <Route path="/seller/products" element={<SellerProduct />} />
              <Route path="/seller/product/:productId" element={<ProductDetails/>} />
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
