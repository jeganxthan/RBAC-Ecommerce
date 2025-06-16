import React, { useContext, useEffect, useState } from 'react'
import SideMenu from '../../components/sidebar/SideMenu'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider';
import moment from 'moment';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS, BASE_URL } from '../../utils/apipaths';
import { toast } from 'react-toastify';
import EditProductModal  from './Modal/EditProductModal'
const SellerDashboard = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [isModalOpen, setIsModalOpen]= useState(false);
  const [editingProduct, setEditingProduct]=useState(null);
  const openEditModal = (product)=>{
    setEditingProduct(product);
    setIsModalOpen(true);
  }
  const closeModal = ()=>{
    setIsModalOpen(false);
    setEditingProduct(null);
  }
  const handleEditChange = (field, value) => {
  setEditingProduct((prev) => ({
    ...prev,
    [field]: value,
  }));
};

  const saveProductUpdate = async()=>{
    try {
      const updatedFields = {
        name:editingProduct.name,
        price:editingProduct.price,
        category:editingProduct.category,
        description:editingProduct.description,
        stock:editingProduct.stock,
      }
      const response = await axiosInstance.put(API_PATHS.SELLER.UPDATE_PRODUCT(editingProduct._id), updatedFields)
      if(response.status===200){
        toast.success("Product updated successfully");
        setProductData(prev=>
          prev.map(p=>(p._id===editingProduct._id?{...p, ...updatedFields}:p))
        );
        closeModal();
      }else{
        toast.error("Failed to update product")
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  const getDashboardData = async () => {
    try {
      const dashboardResponse = await axiosInstance.get(API_PATHS.SELLER.SELLER_DASHBOARD);
      const productResponse = await axiosInstance.get(API_PATHS.SELLER.GET_ALL_PRODUCT);
      if (dashboardResponse.data) {
        setDashboardData(dashboardResponse.data);
      } if (productResponse.data) {
        setProductData(productResponse.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  }
  useEffect(() => {
    getDashboardData();
  }, [])

  const deleteProduct = async (productId) => {
    try {
      const response = await axiosInstance.delete(API_PATHS.SELLER.DELETE_PRODUCT(productId));
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        setProductData(prev => prev.filter(p => p._id !== productId));
      } else {
        toast.error("Failed to delete");
      }

    } catch (error) {
      console.error("Error deleteing product:", error);
    }
  }
  
  if (!dashboardData) return null;

  return (
    <div>
      <SideMenu activeMenu={location.pathname} />
      <div className='md:ml-[100px] md:mt-10 ml-12 mt-6 '>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row items-center gap-4'>
            <img src={user.profileImageUrl} alt="profile" className='rounded-full w-[100px] h-[100px]' />
            <div>
              <h2 className='md:text-2xl text-sm'>Good Morning! {user.name}</h2>
              <p className='md:text-sm text-xs text-gray-500 mt-1.5'>
                {moment().format("ddd Do MMM YYYY")}
              </p>
            </div>
          </div>
          <div className='flex flex-col mr-10 items-center text-xs md:text-base'>
            <p>Your total products:</p>
            <p>{dashboardData.totalProduct}</p>
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold mt-8">Product Count by Category:</p>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mt-4">
            {dashboardData.categoryProductCount.map((item) => (
              <div key={item.category} className="bg-white">
                <p className="text-gray-600">{item.category}</p>
                <p className="text-2xl font-bold text-blue-500">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid md:grid-cols-3 grid-cols-1 gap-6">
          {productData.length === 0 ? (
            <p>No products found.</p>
          ) : (
            productData.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                <img
                  src={`${BASE_URL}${product.images?.[0]}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-500 mb-2">{product.category}</p>
                {isModalOpen&&(
                  <EditProductModal
                  product={editingProduct}
                  onChange={handleEditChange}
                  onClose={closeModal}
                  onSave={saveProductUpdate}
                  />
                )}
                <button onClick={()=>openEditModal(product)}>
                  Edit
                </button>
                <button onClick={() => deleteProduct(product._id)}>
                  Delete
                </button>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default SellerDashboard