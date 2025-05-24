import React from 'react'
import { X } from 'lucide-react'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
// import Signup from './pages/Signup' // when available

const Modal = ({ setOpen, currentPage, setCurrentPage }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg flex justify-center items-center z-50 font-urbanist">
      <div className="flex flex-col items-center bg-white md:w-fit md:p-6 p-2 text-black rounded-md relative">
        <button className='absolute top-2 right-2' onClick={() => setOpen(false)}>
          <X />
        </button>
        
        {currentPage === "login"
          ? <Login setCurrentPage={setCurrentPage} />
          : <Signup setCurrentPage={setCurrentPage}/> }
      </div>
    </div>
  )
}

export default Modal
