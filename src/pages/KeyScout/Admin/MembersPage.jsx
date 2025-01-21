import React, { useState } from 'react';
import { useDesign } from '../../../context/DesignContext';
import Sidebar from '../../../components/Sidebar';
import { Link } from 'react-router-dom';
import EditUserForm from '../../../components/EditUserForm';

// Initial members data
const initialMembers = [
  {
    id: 1,
    name: 'John Doe',
    phoneNumber: '+85212345678',
    did: 'did:skh:zGMkoTFgBNmp1C...',
    email: 'john@example.com',
    userType: 'Employee',
    authMethod: 'Mobile Number',
    status: 'Connected',
  },
];

export const MembersContext = React.createContext();

export const useMembersContext = () => {
  const context = React.useContext(MembersContext);
  if (!context) {
    throw new Error('useMembersContext must be used within a MembersProvider');
  }
  return context;
};

export const MembersProvider = ({ children }) => {
  const [members, setMembers] = useState(initialMembers);

  const addMember = (newMember) => {
    setMembers(currentMembers => [
      ...currentMembers,
      { ...newMember, id: currentMembers.length + 1, status: 'Connected' }
    ]);
  };

  const updateMember = (updatedMember) => {
    setMembers(currentMembers =>
      currentMembers.map(member =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
  };

  const deleteMember = (id) => {
    setMembers(currentMembers => currentMembers.filter(member => member.id !== id));
  };

  return (
    <MembersContext.Provider value={{ members, addMember, updateMember, deleteMember }}>
      {children}
    </MembersContext.Provider>
  );
};

const MembersPage = () => {
  const { currentDesign, designs } = useDesign();
  const { members, updateMember, deleteMember } = useMembersContext();
  const [editingMember, setEditingMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    name: '',
    phoneNumber: '',
    email: ''
  });

  const handleEdit = (member) => {
    setEditingMember(member);
  };

  const handleUpdateMember = (updatedMember) => {
    updateMember(updatedMember);
    setEditingMember(null);
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetSearch = () => {
    setSearchQuery({
      name: '',
      phoneNumber: '',
      email: ''
    });
  };

  const handleSearch = () => {
    console.log('Searching with:', searchQuery);
  };

  const filteredMembers = members.filter(member => {
    const nameMatch = member.name.toLowerCase().includes(searchQuery.name.toLowerCase());
    const phoneMatch = member.phoneNumber.includes(searchQuery.phoneNumber);
    const emailMatch = member.email.toLowerCase().includes(searchQuery.email.toLowerCase());

    return nameMatch && phoneMatch && emailMatch;
  });

  return (
    <div className={`h-screen overflow-hidden transition-colors duration-1000 ${designs[currentDesign].bgColor}`}>
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F0F4F1]">
          <div className="container mx-auto px-6 py-8">
            {editingMember ? (
              <>
                <h3 className="text-[#2E3930] text-3xl font-medium mb-4">Edit Member</h3>
                <EditUserForm 
                  member={editingMember}
                  onSubmit={handleUpdateMember}
                  onCancel={handleCancelEdit}
                />
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[#2E3930] text-3xl font-medium">Members</h3>
                  <Link
                    to="/keyscout-admin/add-user"
                    className="bg-[#2F6148] hover:bg-[#2E3930] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  >
                    Add New Member
                  </Link>
                </div>

                {/* Search Section */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Search by Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={searchQuery.name}
                        onChange={handleSearchChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#73A468] focus:border-transparent"
                        placeholder="Enter name..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Search by Phone
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={searchQuery.phoneNumber}
                        onChange={handleSearchChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#73A468] focus:border-transparent"
                        placeholder="Enter phone number..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Search by Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={searchQuery.email}
                        onChange={handleSearchChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#73A468] focus:border-transparent"
                        placeholder="Enter email..."
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={handleSearch}
                      className="bg-[#2F6148] hover:bg-[#2E3930] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                    >
                      Search
                    </button>
                    <button
                      onClick={handleResetSearch}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Table Section */}
                <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr>
                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          DID
                        </th>
                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Auth Method
                        </th>
                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMembers.map((member) => (
                        <tr key={member.id}>
                          <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-nowrap">{member.name}</p>
                          </td>
                          <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-nowrap">{member.phoneNumber}</p>
                          </td>
                          <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[150px]">{member.did}</p>
                          </td>
                          <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-nowrap">{member.email}</p>
                          </td>
                          <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-nowrap">{member.userType}</p>
                          </td>
                          <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-nowrap">{member.authMethod}</p>
                          </td>
                          <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              member.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm">
                            <div className="flex space-x-2">
                              <button 
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => handleEdit(member)}
                              >
                                Edit
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-800"
                                onClick={() => deleteMember(member.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MembersPage;

