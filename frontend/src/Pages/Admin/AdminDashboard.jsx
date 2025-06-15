import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideMenu from '../../components/sidebar/SideMenu';
import { UserContext } from '../../context/UserProvider';
import moment from 'moment';
import { API_PATHS } from '../../utils/apipaths';
import axiosInstance from '../../utils/axiosInstance';
import blueimage from '../../assets/Image.png';

const AdminDashboard = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [dashboardData, setDashboardData] = useState(null);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.ADMIN.ADMIN_DASHBOARD);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (!dashboardData) return null; 

  const totalUsers =
    dashboardData.sellerCount +
    dashboardData.userCount +
    dashboardData.adminCount;

  return (
    <div>
      <SideMenu activeMenu={location.pathname} />
      <div className='md:ml-[100px] md:mt-10 ml-12 mt-6'>
        <div className='flex flex-row justify-between'>
          <div>
            <h2 className='md:text-2xl text-sm'>Good Morning! {user.name}</h2>
            <p className='md:text-sm text-xs text-gray-500 mt-1.5'>
              {moment().format("ddd Do MMM YYYY")}
            </p>
          </div>
          <div className='flex flex-col mr-10 items-center text-xs md:text-base'>
            <p>Total Products:</p>
            <p>{dashboardData.totalProduct}</p>
          </div>
        </div>

        <div className='md:mt-8 mt-2'>
          <img
            src={blueimage}
            alt="Dashboard Banner"
            className='md:w-[1240px] md:h-[200px] object-cover w-[265px] h-screen ms:w-[320px] sm:w-[300px] ml:w-[370px]'
          />
          <div className='absolute inset-[150px]'>
            <p className='md:text-white md:text-xl text-sm -ml-20 -mt-[60px] md:w-[400px] w-[200px] text-black md:mt-0 md:ml-0 mb-2 ms:w-[300px]'>
              There are currently {totalUsers} users using our website.
            </p>
            <div className='flex md:flex-row md:gap-10 flex-col w-[200px] gap-8 md:ml-0 ml-[-70px] ms:w-[250px] md:w-full ml:w-[300px]'>
              <div className='card'>
                <p className='card-title'>Seller Count</p>
                <p className='text-3xl font-bold text-green-600'>{dashboardData.sellerCount}</p>
              </div>
              <div className='card'>
                <p className='card-title'>User Count</p>
                <p className='text-3xl font-bold text-blue-600'>{dashboardData.userCount}</p>
              </div>
              <div className='card'>
                <p className='card-title'>Admin Count</p>
                <p className='text-3xl font-bold text-violet-600'>{dashboardData.adminCount}</p>
              </div>
            </div>
          </div>
        </div>

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
  );
};

export default AdminDashboard;
