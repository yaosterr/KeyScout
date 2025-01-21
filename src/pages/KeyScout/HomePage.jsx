import React from 'react'
import RightSideDesign from '../../components/RightSideDesign'
import QRCodeSection from '../../components/QRCodeSection'
import { useDesign } from '../../context/DesignContext'

export default function KeyScoutHomepage() {
  const { currentDesign, designs } = useDesign();

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
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Hey Scout! 👋</h1>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg">Welcome to KeyScout. A timecapsule for all your Scouts memories</p>
                </div>

                {/* Horizontal line */}
                <div className="w-full h-[0.5px] bg-[#AAAAAA] mb-6"></div>

                {/* QR Code Section */}
                <div className="mt-6 w-full flex justify-center items-center">
                  <QRCodeSection />
                </div>
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
