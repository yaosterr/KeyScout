import React from 'react'
import { useNavigate } from 'react-router-dom'
import RightSideDesign from '../../../../components/RightSideDesign'
import { useDesign } from '../../../../context/DesignContext'

const CARD_DATA = [
  {
    title: 'Timecapsule',
    description: 'Build your own timecapsule with your scouts memories',
    bgColor: 'bg-[#2E3930]',
    imageSrc: '/keyscout/timecapsule-bg.png',
    buttonText: "Let's go!",
    buttonAction: 'handleLetsGo',
    disabled: false
  },
  {
    title: 'KeyScout Card',
    description: 'Your very own Scouts digital identity card.',
    bgColor: 'bg-[#2F6148]',
    imageSrc: '/keyscout/keyscout-card-bg.png',
    buttonText: 'Coming Soon',
    buttonAction: null,
    disabled: true
  },
  {
    title: 'eBadge system',
    description: 'Store your hard earned Scouts badges in your KeyScout wallet',
    bgColor: 'bg-[#753636]',
    imageSrc: '/keyscout/ebadge-bg.png',
    buttonText: 'Coming Soon',
    buttonAction: null,
    disabled: true,
    darkOverlay: true
  }
];

export default function AdminGettingStartedPage() {
  const { currentDesign, designs } = useDesign();
  const navigate = useNavigate()

  const handleLetsGo = () => {
    navigate('/keyscout/admin/upload')
  }

  return (
    <div
      className={`h-screen overflow-hidden transition-colors duration-1000 ${designs[currentDesign].bgColor}`}
    >
      <div className="flex h-full items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-[1600px] h-[92vh]">
          <div className="flex flex-col md:flex-row h-full">
            {/* Left side - Getting Started content */}
            <div className="p-4 sm:p-6 md:p-8 md:w-[45%] flex flex-col justify-start sm:justify-center items-center font-inria relative">
                <div className="w-full max-w-md mt-8 sm:mt-0">
                {/* Top text section */}
                <div className="mb-2 md:mb-4 text-left">
                  <h1 className="text-3xl font-bold mb-6">Getting started 👋</h1>
                  <p className="text-gray-600">We have a few different options for you. Where would you like to start?</p>
                </div>

                {/* Horizontal line divider */}
                <div className="w-full h-[0.5px] bg-[#AAAAAA] mb-4"></div>

                {/* Cards section */}
                <div className="space-y-4 mt-4 md:mt-8">
                  {CARD_DATA.map((card, index) => (
                    <div key={index} className={`relative overflow-hidden rounded-lg h-48 ${card.bgColor}`}>
                      <img src={card.imageSrc} alt={card.title} className={`w-full h-full object-cover ${card.darkOverlay ? 'opacity-50' : 'opacity-50'}`} />
                      {card.darkOverlay && (
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                      )}
                      <div className="absolute inset-0 p-4 flex flex-col justify-between">
                        <div>
                          <h2 className="text-white text-xl font-semibold mb-2 text-shadow-md">{card.title}</h2>
                          <p className="text-white mb-4 text-shadow-sm">{card.description}</p>
                        </div>
                        <button 
                          className={`w-full ${card.disabled ? 'bg-[#D9D9D9] text-gray-700' : 'bg-[#73A468] hover:bg-[#7ACC7E] text-white'} py-2 rounded transition-colors duration-200`}
                          onClick={card.buttonAction ? handleLetsGo : undefined}
                          disabled={card.disabled}
                        >
                          {card.buttonText}
                        </button>
                      </div>
                    </div>
                  ))}
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
