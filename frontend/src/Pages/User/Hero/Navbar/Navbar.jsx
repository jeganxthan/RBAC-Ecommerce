import React, { useContext, useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../context/UserProvider';
import LogoutModal from '../../LogoutModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, clearUser } = useContext(UserContext);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLinkClick = (id) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  const handleLogout = () => {
    clearUser();
    setShowLogoutModal(false);
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-blue-600">MyApp</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-4 items-center">
            <button onClick={() => handleLinkClick('home')} className="text-gray-700 hover:text-blue-600">Home</button>
            <button onClick={() => handleLinkClick('about')} className="text-gray-700 hover:text-blue-600">About</button>
            <button onClick={() => handleLinkClick('contact')} className="text-gray-700 hover:text-blue-600">Contact</button>
            <button onClick={() => navigate('/user/cart')} className="text-gray-700 hover:text-blue-600">
              <ShoppingCart size={18} />
            </button>
            <div className="relative group inline-block">
              <img
                src={user.profileImageUrl}
                alt="profile"
                className="rounded-full w-[40px] h-[40px] object-cover cursor-pointer"
              />
              <div className="absolute top-full right-0 mt-2 w-24 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-10">
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          <button onClick={() => handleLinkClick('home')} className="block text-gray-700 hover:text-blue-600 w-full text-left">Home</button>
          <button onClick={() => handleLinkClick('about')} className="block text-gray-700 hover:text-blue-600 w-full text-left">About</button>
          <button onClick={() => handleLinkClick('services')} className="block text-gray-700 hover:text-blue-600 w-full text-left">Services</button>
          <button onClick={() => handleLinkClick('contact')} className="block text-gray-700 hover:text-blue-600 w-full text-left">Contact</button>
           <button onClick={() => setShowLogoutModal(true)} className="block text-gray-700 hover:text-blue-600 w-full text-left">Logout</button>
        </div>
      )}

      <LogoutModal
        isOpen={showLogoutModal}
        onConfirm={handleLogout}
        onCancel={cancelLogout}
      />
    </nav>
  );
};

export default Navbar;
