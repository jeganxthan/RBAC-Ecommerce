import React, { useContext } from 'react'
import SideMenu from '../../components/sidebar/SideMenu'
import { useLocation } from 'react-router-dom'
import UserProvider from '../../context/UserProvider';

const AdminLogout = () => {
    const location = useLocation();
    const {clearUser} = useContext(UserProvider);
  return (

    <div>
        <SideMenu activeMenu={location.pathname}/>
    </div>
  )
}

export default AdminLogout