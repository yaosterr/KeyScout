import React, { useState } from 'react';
import { useDesign } from '../../../context/DesignContext';
import Sidebar from '../../../components/Sidebar';

const initialMembers = [
  {
    id: 1,
    name: 'John Doe',
    type: 'Scout',
    badges: ['Time Keeper'],
    stats: {
      memoriesUploaded: 15,
      timeCapsules: 2
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    type: 'Scout',
    badges: ['Time Keeper'],
    stats: {
      memoriesUploaded: 23,
      timeCapsules: 3
    }
  },
  {
    id: 3,
    name: 'Mike Wilson',
    type: 'Scout',
    badges: [],
    stats: {
      memoriesUploaded: 8,
      timeCapsules: 1
    }
  }
];

const BadgesPage = () => {
  const { currentDesign, designs } = useDesign();
  const [members, setMembers] = useState(initialMembers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`h-screen overflow-hidden transition-colors duration-1000 ${designs[currentDesign].bgColor}`}>
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F0F4F1]">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#2E3930] text-3xl font-medium">Scout Badges</h3>
              <div className="w-64">
                <input
                  type="text"
                  placeholder="Search members..."
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#73A468]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map(member => (
                <div key={member.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-medium">{member.name}</h4>
                      <p className="text-gray-600">{member.type}</p>
                    </div>
                  </div>

                  {/* Badges Section */}
                  <div className="mb-4">
                    <h5 className="text-lg font-medium mb-2">Badges</h5>
                    <div className="flex flex-wrap gap-2">
                      {member.badges.length > 0 ? (
                        member.badges.map((badge, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#73A468] text-white rounded-full text-sm"
                          >
                            {badge}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 italic">No badges earned yet</span>
                      )}
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div>
                    <h5 className="text-lg font-medium mb-2">Statistics</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Memories Uploaded:</span>
                        <span className="font-medium">{member.stats.memoriesUploaded}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Time Capsules:</span>
                        <span className="font-medium">{member.stats.timeCapsules}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BadgesPage; 