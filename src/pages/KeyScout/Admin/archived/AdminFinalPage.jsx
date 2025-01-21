import React from 'react'
import { useNavigate } from 'react-router-dom'
import RightSideDesign from '../../../../components/RightSideDesign'
import { useDesign } from '../../../../context/DesignContext'

function StatisticsSection() {
  return (
    <div className="flex justify-between mb-6">
      <div>
        <h2 className="text-4xl font-bold">25</h2>
        <p className="text-sm text-gray-600">memories uploaded</p>
      </div>
      <div>
        <h2 className="text-4xl font-bold">5</h2>
        <p className="text-sm text-gray-600">year time capsule</p>
      </div>
      <div>
        <h2 className="text-4xl font-bold">1</h2>
        <p className="text-sm text-gray-600">new badge earned</p>
      </div>
    </div>
  );
}

function BadgeSection() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
      <img
        src="/keyscout/time-keeper.png"
        alt="Time Keeper Badge"
        className="w-56 h-44 mx-auto mb-4"
      />
      <h3 className="text-2xl sm:text-3xl font-bold mb-2">Time Keeper</h3>
      <p className="text-sm text-gray-600">Congrats! You've earned your Time Keeper badge</p>
    </div>
  );
}

export default function AdminFinalPage() {
  const { currentDesign, designs } = useDesign();
  const navigate = useNavigate()

  const handleDoneClick = () => {
    navigate('/keyscout/admin/getting-started')
  }

  return (
    <div className={`h-screen overflow-hidden transition-colors duration-1000 ${designs[currentDesign].bgColor}`}>
      <div className="flex h-full items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-[1600px] h-[92vh]">
          <div className="flex flex-col md:flex-row h-full">
            {/* Left side - Final page content */}
            <div className="p-4 sm:p-6 md:p-8 md:w-[45%] flex flex-col justify-start sm:justify-center items-center font-inria relative">
                <div className="w-full max-w-md mt-8 sm:mt-0 flex flex-col justify-center h-full">
                <h1 className="text-3xl font-bold mb-2">Nicely done, champ! 🎉</h1>
                <p className="text-gray-600 mb-6">We will keep these memories safe for you!</p>
                
                {/* Horizontal line divider */}
                <div className="w-full h-[0.5px] bg-[#AAAAAA] mb-6"></div>
                
                <StatisticsSection />
                
                <BadgeSection />
                
                <button 
                  className="w-full bg-[#73A468] hover:bg-[#7ACC7E] text-white py-3 rounded transition-colors duration-200"
                  onClick={handleDoneClick}
                >
                  Done
                </button>
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

