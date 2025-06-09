import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideMenu from '../../components/sidebar/SideMenu';
import { UserContext } from '../../context/UserProvider';
import moment from 'moment'
import { API_PATHS } from '../../utils/apipaths';
import axiosInstance from '../../utils/axiosInstance';
import blueimage from '../../assets/Image.png'
const AdminDashboard = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [dashboardData, setDashboardData] = useState(null);
  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.ADMIN.ADMIN_DASHBOARD
      );
      console.log("API response", response)
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    getDashboardData()
    return () => { }
  }, [])
  return (
    <div>
      <SideMenu activeMenu={location.pathname} />
      <div className='ml-[100px] mt-10'>
        <div className='flex flex-row justify-between'>
          <div>
        <h2 className='text-2xl'>
          Good Morning! {user.name}
        </h2>
        <p className='text-sm text-gray-500 mt-1.5'>
          {moment().format("ddd Do MMM YYYY")}
        </p>
          </div>
        <div className='flex flex-col mr-10 items-center'>
          <p>Total Products:</p>
          <p>{dashboardData.totalProduct}</p>
        </div>

        </div>
        <div className='mt-8'>
          <img src={blueimage} alt="" className='w-[1240px] h-[200px] object-cover' />
          <div className='absolute inset-[150px]'>

            <p className='text-white text-xl'>
              {dashboardData
                ? `There are currently ${dashboardData.sellerCount + dashboardData.userCount + dashboardData.adminCount} users using our website.`
                : 'Loading user data...'}
            </p>
            <div className='flex flex-row gap-10'>
              <div className='card'>
                <p className='card-title'>Seller Count</p>
                <p className='text-3xl font-bold text-green-600'>{dashboardData ? dashboardData.sellerCount : 'Loading...'}</p>
              </div><div className='card'>
                <p className='card-title'>User Count</p>
                <p className='text-3xl font-bold text-blue-600'>{dashboardData ? dashboardData.userCount : 'Loading...'}</p>
              </div><div className='card'>
                <p className='card-title'>Admin Count</p>
                <p className='text-3xl font-bold text-violet-600'>{dashboardData ? dashboardData.adminCount : 'Loading...'}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-lg font-semibold mt-8">Product Count by Category:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {dashboardData?.categoryProductCount?.map((item) => (
            <div key={item.category} className="bg-white ">
              <p className="text-gray-600">{item.category}</p>
              <p className="text-2xl font-bold text-blue-500">{item.count}</p>
            </div>
          )) || <p>Loading categories...</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
