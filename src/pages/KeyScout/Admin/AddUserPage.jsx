import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDesign } from '../../../context/DesignContext';
import { useMembersContext } from './MembersPage';
import Sidebar from '../../../components/Sidebar';
import AddUserForm from '../../../components/AddUserForm';

const AddUserPage = () => {
  const { currentDesign, designs } = useDesign();
  const navigate = useNavigate();
  const { addMember } = useMembersContext();

  const handleSubmitSuccess = (userData) => {
    addMember(userData);
    navigate('/keyscout-admin');
  };

  return (
    <div className={`h-screen overflow-hidden transition-colors duration-1000 ${designs[currentDesign].bgColor}`}>
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F0F4F1]">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-[#2E3930] text-3xl font-medium mb-4">Add New Member</h3>
            <AddUserForm onSubmit={handleSubmitSuccess} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddUserPage;

