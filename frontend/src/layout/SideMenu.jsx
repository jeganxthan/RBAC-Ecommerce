import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../utils/data';

const SideMenu = ({ activeMenu, onClose }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
    onClose?.(); // close on mobile
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-61px)] sticky top-[61px] bg-white dark:bg-black">
      <div className="flex flex-col items-center mb-7 pt-5">
        <div className="relative flex justify-center">
          <img
            src={user?.profileImageUrl || ""}
            alt="profile"
            className="w-20 h-20 bg-slate-400 rounded-full object-cover"
          />
        </div>

        {user?.role === "admin" && (
          <div className="mt-2 text-xs font-medium text-gray-500 dark:text-white bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md">
            Admin
          </div>
        )}

        <h5 className="text-lg font-semibold mt-1 capitalize">{user?.name || ""}</h5>
        <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email || ""}</p>
      </div>

      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-6 text-[15px] ${
            activeMenu === item.label ? "text-blue-600 border-r-4 border-blue-600 font-semibold" : "text-gray-700 dark:text-gray-300"
          } py-3 px-6 mb-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
