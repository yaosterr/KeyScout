import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function QRCodeSection({ isAdmin = false, onClick }) {
  const navigate = useNavigate();

  const handleQRCodeClick = () => {
    if (onClick) {
      onClick();
    } else if (isAdmin) {
      navigate('/keyscout-admin');
    } else {
      navigate('/keyscout/getting-started');
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <div className="w-full max-w-[280px] sm:max-w-none mb-4 sm:mb-8">
        <div className="pl-[34px] sm:pl-[50px] md:pl-[60px]">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Login</h2>
          <p className="text-gray-600 mb-4 sm:mb-6">Scan with your KeyPear Wallet</p>
        </div>
        <div className="flex justify-center">
          <img
            src="/keyscout/qr-code.png"
            alt="QR Code"
            className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] cursor-pointer"
            onClick={handleQRCodeClick}
          />
        </div>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 text-center w-full max-w-[280px] sm:max-w-none">
        Don't have KeyPear? Download it <a href="https://apps.apple.com/hk/app/keypear-digital-wallet/id6478481124" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">here</a>
      </p>
    </div>
  );
}
