import React from 'react';
import UserForm from './shared/UserForm';

const AddUserForm = ({ onSubmit }) => {
  return (
    <UserForm 
      onSubmit={onSubmit}
      submitLabel="Add Member"
    />
  );
};

export default AddUserForm;
