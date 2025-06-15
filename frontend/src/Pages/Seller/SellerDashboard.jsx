import React, { useContext, useEffect, useState } from 'react'
import SideMenu from '../../components/sidebar/SideMenu'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider';
import moment from 'moment';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apipaths';

const SellerDashboard = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [dashboardData, setDashboardData] = useState(null);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SELLER.SELLER_DASHBOARD);
      console.log("Seller dashboard response", response.data);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      console.error("Error fetching dashboard data", error);
    }
  }
  useEffect(() => {
    getDashboardData();
  }, [])

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
      </div>
    </div>
  )
}

export default SellerDashboard