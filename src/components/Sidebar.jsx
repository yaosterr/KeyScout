import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'bg-[#2F6148]' : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/keyscout-admin/login');
  };

  const navigationItems = [
    { path: '/keyscout-admin', label: 'Members' },
    { path: '/keyscout-admin/timecapsule', label: 'Time Capsules' },
    { path: '/keyscout-admin/badges', label: 'Badges' }
  ];

  return (
    <div className="bg-[#2E3930] text-white w-64 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out flex flex-col h-full">
      <Link to="/keyscout-admin" className="text-white flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">KeyScout Admin</span>
      </Link>
      <nav className="space-y-2 mt-6">
        <Link 
          to="/keyscout-admin" 
          className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-[#2F6148] text-white hover:text-white ${isActive('/keyscout-admin') && !location.pathname.includes('/timecapsule') && !location.pathname.includes('/badges')}`}
        >
          Members
        </Link>
        <Link 
          to="/keyscout-admin/timecapsule" 
          className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-[#2F6148] text-white hover:text-white ${isActive('/keyscout-admin/timecapsule')}`}
        >
          Time Capsules
        </Link>
        <Link 
          to="/keyscout-admin/badges" 
          className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-[#2F6148] text-white hover:text-white ${isActive('/keyscout-admin/badges')}`}
        >
          Badges
        </Link>
      </nav>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full py-2.5 px-4 rounded transition duration-200 hover:bg-[#2F6148] text-white hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
