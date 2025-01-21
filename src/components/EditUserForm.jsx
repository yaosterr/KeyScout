import React from 'react';
import UserForm from './shared/UserForm';

const EditUserForm = ({ member, onSubmit, onCancel }) => {
  return (
    <div>
      <UserForm 
        initialData={member}
        onSubmit={onSubmit}
        submitLabel="Save Changes"
      />
      <button
        onClick={onCancel}
        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
      >
        Cancel
      </button>
    </div>
  );
};

export default EditUserForm; 