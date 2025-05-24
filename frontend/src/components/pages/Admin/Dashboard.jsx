import React, { useContext, useState, useEffect } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import { UserContext } from '../../../context/UserContext'
import axiosInstance from '../../../utils/axiosInstance';
import { API_PATHS } from '../../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import { addThousandsSepartor } from '../../../utils/validateEmail';
import InfoCard from '../../cards/InfoCard';
import { ArrowRight } from 'lucide-react';
import TaskListTable from '../../TaskListTable';
const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartDate, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      console.log('API response:', response)
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  const onSeeMore = ()=>{
    navigate('/admin/tasks')
  }

  useEffect(() => {
    getDashboardData()
    return () => { }
  }, [])

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='card my-5'>
        <div>
          <div>
            <h2 className='text-xl font-bold'>
              Good Morning! {user.name}
            </h2>
            <p className='text-sm text-gray-500 mt-1.5'>
              {moment().format("ddd Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5'>
          <InfoCard
            label="Total tasks"
            value={addThousandsSepartor(dashboardData?.charts?.taskDistribution?.All || 0)}
            color="bg-blue-500"
          />
          <InfoCard
            label="Pending Tasks"
            value={addThousandsSepartor(dashboardData?.charts?.taskDistribution?.Pending || 0)}
            color="bg-violet-500"
          />
          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSepartor(dashboardData?.charts?.taskDistribution?.InProgress || 0)}
            color="bg-cyan-500"
          />
          <InfoCard
            label="Completed Tasks"
            value={addThousandsSepartor(dashboardData?.charts?.taskDistribution?.Completed || 0)}
            color="bg-lime-500"
          />
        </div>

      </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>
          <div className='md:col-span-2'>
            <div className='card'>
              <div className='flex items-center justify-between'>
                <h5 className='text-lg'>
                  Recent Tasks
                </h5>
                <button className='card-btn' onClick={onSeeMore}>
                  <ArrowRight className='text-base'/>
                </button>
              </div>
              <TaskListTable table={dashboardData?.recentTasks || []}/>
            </div>
          </div>
        </div>
    </DashboardLayout>
  )
}

export default Dashboard