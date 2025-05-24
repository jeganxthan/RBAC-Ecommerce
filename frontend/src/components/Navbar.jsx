import React from 'react';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
import Modal from './Modal';
const Navbar = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [currentPage, setCurrentPage] = useState('login')

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-lg">
      <div className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
        <h1 className="md:text-2xl text-base font-urbanist text-black dark:text-white">Task Manager</h1>
        <div className="flex gap-4">
          <ThemeToggle />
          <button onClick={()=>setOpenLogin(true)}
           className="btn-theme">LOGIN/SIGNUP</button>
        </div>
      </div>
      {/*Modal*/}
      {openLogin &&(
        <Modal 
        setOpen={setOpenLogin}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}/>
      )}
    </div>
  );
};

export default Navbar;
