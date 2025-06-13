import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Menu, X } from 'lucide-react';
import {
  SIDE_MENU_DATA,
  SIDE_MENU_USER_DATA,
  SIDE_MENU_SELLER_DATA,
} from '../../utils/data';
import { useNavigate } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.jpg';

const SideMenu = ({ activeMenu }) => {
  const { user, loading } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) return <div>Loading user data...</div>;
  if (!user) return <div>Please log in to see the menu.</div>;

  let menuItems = [];
  switch (user.role) {
    case 'admin':
      menuItems = SIDE_MENU_DATA;
      break;
    case 'user':
      menuItems = SIDE_MENU_USER_DATA;
      break;
    case 'seller':
      menuItems = SIDE_MENU_SELLER_DATA;
      break;
    default:
      menuItems = [];
  }

  const handleItemClick = (path) => {
    if (path === 'logout') {
      console.log('Logging out...');
    } else {
      navigate(path);
    }
    setOpen(false);
  };

  return (
    <div>
      {!open && (
        <div className="fixed top-0 left-0 h-full md:w-16 w-10 bg-white shadow-md z-30 flex flex-col items-center py-4">
          <button onClick={() => setOpen(true)} aria-label='Open menu'>
            <Menu size={24} />
          </button>
          <div className="mt-6 flex flex-col gap-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.path;
              return (
                <div
                  key={item.label}
                  className={`cursor-pointer ${isActive ? 'text-[#1977a8]' : 'text-black hover:text-[#1977a8]'}`}
                  onClick={() => handleItemClick(item.path)}
                  title={item.label}
                >
                  {Icon && <Icon size={24} />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {open && (
        <>
          <div className='fixed inset-0 bg-black opacity-40 z-40' onClick={() => setOpen(false)}></div>

          <div className='fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg p-4'>
            <div className='flex justify-between items-center mb-4'>
              <h1 className='text-lg font-semibold'>Menu</h1>
              <button onClick={() => setOpen(false)} aria-label='Close menu'>
                <X size={24} />
              </button>
            </div>

            <div className='mb-4 flex justify-center flex-col items-center'>
              <img
                src={user.profilePicture || defaultProfile}
                alt="User Profile" className='rounded-full w-[100px] h-[100px]'
              />

              <p className='font-bold capitalize'>{user.name}</p>
              <p className='text-sm bg-[#1977a8] text-white p-1 rounded-md'>{user.role}</p>
            </div>

            <ul>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.path;

                return (
                  <li
                    key={item.label}
                    className={`flex items-center py-2 px-4 cursor-pointer rounded-md gap-3 mt-2
                  ${isActive ? 'text-[#1977a8] font-semibold' : 'text-black hover:bg-gray-200'}`}
                    onClick={() => handleItemClick(item.path)}
                  >
                    {Icon && <Icon size={20} className={isActive ? 'text-[#1977a8]' : 'text-black'} />}
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );

};

export default SideMenu;
