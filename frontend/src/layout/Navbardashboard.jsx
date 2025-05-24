import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import SideMenu from './SideMenu';
import ThemeToggle from '../components/ThemeToggle';

const Navbardashboard = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="relative z-50">
        <div className="flex flex-row p-6 items-center bg-white dark:bg-black shadow-lg space-x-6">
          {/* Mobile menu button */}
          <button
            onClick={() => setOpenSideMenu(!openSideMenu)}
            className="md:hidden"
          >
            {openSideMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <h2 className="text-xl font-semibold">Task Manager</h2>
          <div className="mt-2">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-md z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          openSideMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SideMenu activeMenu={activeMenu} onClose={() => setOpenSideMenu(false)} />
      </div>
    </>
  );
};

export default Navbardashboard;
