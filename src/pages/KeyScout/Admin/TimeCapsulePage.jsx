import React, { useState } from 'react';
import { useDesign } from '../../../context/DesignContext';
import Sidebar from '../../../components/Sidebar';
import { Link } from 'react-router-dom';

const initialTimeCapsules = [
  {
    id: 1,
    name: 'Summer Camp 2023',
    openDate: '2024-12-31',
    memberCount: 15,
    imageCount: 24,
    description: 'Memories from our summer camp adventure',
    members: [
      { id: 1, name: 'John Doe', type: 'Scout' },
      { id: 2, name: 'Jane Smith', type: 'Scout Leader' },
    ],
    images: [
      { id: 1, url: 'path/to/image1.jpg', uploadedBy: 'John Doe', uploadDate: '2023-07-15' },
      { id: 2, url: 'path/to/image2.jpg', uploadedBy: 'Jane Smith', uploadDate: '2023-07-16' },
    ]
  },
  {
    id: 2,
    name: 'Winter Expedition 2023',
    openDate: '2025-01-15',
    memberCount: 12,
    imageCount: 18,
    description: 'Capturing moments from our winter hiking and survival skills training',
    members: [
      { id: 3, name: 'Mike Wilson', type: 'Scout' },
      { id: 4, name: 'Sarah Chen', type: 'Scout Leader' },
      { id: 5, name: 'Tom Brown', type: 'Scout' },
    ],
    images: [
      { id: 3, url: 'path/to/image3.jpg', uploadedBy: 'Mike Wilson', uploadDate: '2023-12-20' },
      { id: 4, url: 'path/to/image4.jpg', uploadedBy: 'Sarah Chen', uploadDate: '2023-12-21' },
      { id: 5, url: 'path/to/image5.jpg', uploadedBy: 'Tom Brown', uploadDate: '2023-12-22' },
    ]
  }
];

const TimeCapsulePage = () => {
  const { currentDesign, designs } = useDesign();
  const [timeCapsules, setTimeCapsules] = useState(initialTimeCapsules);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddTimeCapsule = () => {
    // Implementation for adding new time capsule
  };

  const handleViewCapsule = (capsule) => {
    setSelectedCapsule(capsule);
  };

  return (
    <div className={`h-screen overflow-hidden transition-colors duration-1000 ${designs[currentDesign].bgColor}`}>
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F0F4F1]">
          <div className="container mx-auto px-6 py-8">
            {selectedCapsule ? (
              // Time Capsule Detail View
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[#2E3930] text-3xl font-medium">{selectedCapsule.name}</h3>
                  <button
                    onClick={() => setSelectedCapsule(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  >
                    Back to List
                  </button>
                </div>

                {/* Time Capsule Info */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Open Date: {selectedCapsule.openDate}</p>
                      <p className="text-gray-600">Members: {selectedCapsule.memberCount}</p>
                      <p className="text-gray-600">Images: {selectedCapsule.imageCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{selectedCapsule.description}</p>
                    </div>
                  </div>
                </div>

                {/* Members List */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <h4 className="text-xl font-medium mb-4">Members</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedCapsule.members.map(member => (
                      <div key={member.id} className="p-3 border rounded-lg">
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.type}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images Grid */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-medium">Images</h4>
                    <button className="bg-[#2F6148] hover:bg-[#2E3930] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                      Upload Image
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedCapsule.images.map(image => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt=""
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                          <button className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded">
                            Delete
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Uploaded by: {image.uploadedBy}</p>
                        <p className="text-sm text-gray-600">Date: {image.uploadDate}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Time Capsules List View
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[#2E3930] text-3xl font-medium">Time Capsules</h3>
                  <button
                    onClick={handleAddTimeCapsule}
                    className="bg-[#2F6148] hover:bg-[#2E3930] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  >
                    Create New Time Capsule
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {timeCapsules.map(capsule => (
                    <div
                      key={capsule.id}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                    >
                      <h4 className="text-xl font-medium mb-2">{capsule.name}</h4>
                      <p className="text-gray-600 mb-4">{capsule.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Open Date: {capsule.openDate}</p>
                        <p className="text-sm text-gray-600">Members: {capsule.memberCount}</p>
                        <p className="text-sm text-gray-600">Images: {capsule.imageCount}</p>
                      </div>
                      <button
                        onClick={() => handleViewCapsule(capsule)}
                        className="mt-4 w-full bg-[#2F6148] hover:bg-[#2E3930] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TimeCapsulePage; 