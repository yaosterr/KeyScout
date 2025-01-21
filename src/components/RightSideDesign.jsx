import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDesign } from '../context/DesignContext'
import styles from './RightSideDesign.module.css'
import SettingsIcon from './Icons/SettingsIcon'

const designs = [
  {
    title: 'KeyScout',
    subtitle: 'A time capsule for your Scouts memories',
    image: '/keyscout/design1.png',
    bgColor: 'bg-[#2E3930]',
    textPosition: 'top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8'
  },
  {
    title: 'KeyScout',
    subtitle: "A Scout's digital identity",
    image: '/keyscout/design2.png',
    bgColor: 'bg-[#2F6148]',
    textPosition: 'top-32 left-4 sm:top-48 sm:left-6 md:top-56 md:left-8'
  },
  {
    title: 'eBadges',
    subtitle: 'Store your badge credentials',
    image: '/keyscout/design3.png',
    bgColor: 'bg-[#753636]',
    textPosition: 'top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 text-right'
  }
]

export default function RightSideDesign() {
  const { currentDesign } = useDesign();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (isAdminPage) {
      navigate('/keyscout/admin');
    } else {
      navigate('/keyscout');
    }
  };

  const handleMembersClick = () => {
    navigate('/keyscout-admin');
  };

  // Check if we're on the homepage, admin homepage, or admin login page
  const hideIcon = location.pathname === '/keyscout' || 
                  location.pathname === '/keyscout-admin/' ||
                  location.pathname === '/keyscout-admin/login';

  // Check if we're on any admin page (except homepage)
  const isAdminPage = location.pathname.startsWith('/keyscout/admin') && location.pathname !== '/keyscout/admin';

  return (
    <div className={`${styles.container} hidden md:block`}>
      <div className={styles.imageContainer}>
        <div className="relative w-full h-full">
          {/* Settings icon and dropdown */}
          {!hideIcon && (
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="focus:outline-none"
              >
                <SettingsIcon className="w-6 h-6 text-white" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {isAdminPage && (
                      <button
                        onClick={handleMembersClick}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                        role="menuitem"
                      >
                        Members
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {designs.map((design, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentDesign ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={design.image}
                alt="Design illustration"
                className={styles.image}
              />
              <div className={`${styles.overlay} ${design.textPosition}`}>
                <h2 className={styles.title}>{design.title}</h2>
                <p className={styles.subtitle}>{design.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dotsContainer}>
        {designs.map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i === currentDesign ? styles.activeDot : styles.inactiveDot}`}
          />
        ))}
      </div>
    </div>
  )
}

export { designs }
