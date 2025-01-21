import React from 'react'
import RightSideDesign from '../../../components/RightSideDesign'
import QRCodeSection from '../../../components/QRCodeSection'
import { useDesign } from '../../../context/DesignContext'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

export default function AdminHomePage() {
  const { currentDesign, designs } = useDesign();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleQRCodeSuccess = (userData) => {
    login(userData);
    
    // Redirect to the originally requested URL or default to admin dashboard
    const from = location.state?.from?.pathname || '/keyscout-admin';
    navigate(from, { replace: true });
  };

  // Commented out form-related state and handlers for future reference
  /*
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempted with:', formData);
  };
  */

  return (
    <div
      className={`h-screen overflow-hidden transition-colors duration-1000 ${designs[currentDesign].bgColor}`}
    >
      <div className="flex h-full items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-[1600px] h-[92vh]">
          <div className="flex flex-col md:flex-row h-full">
            {/* Left side - consistent across all designs */}
            <div className="p-4 sm:p-6 md:p-8 md:w-[45%] flex flex-col justify-center font-inria relative">
              <div className="w-full max-w-xl mx-auto flex flex-col justify-center h-full mt-16 sm:mt-12 md:mt-0">
                {/* Top text section */}
                <div className="mb-2 w-full"> 
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Welcome, Admin! 🛡️</h1>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg">Please login to access the KeyScout admin portal</p>
                </div>

                {/* Horizontal line */}
                <div className="w-full h-[0.5px] bg-[#AAAAAA] mb-6"></div>

                {/* QR Code Section */}
                <div className="mt-6 w-full flex justify-center items-center">
                  <QRCodeSection 
                    isAdmin={true} 
                    onClick={handleQRCodeSuccess}
                  />
                </div>

                {/* Commented out form section for future reference */}
                {/*
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                */}
              </div>
            </div>

            {/* Right side */}
            <RightSideDesign />
          </div>
        </div>
      </div>
    </div>
  )
}
