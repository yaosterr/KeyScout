import React from 'react';
import { useForm } from 'react-hook-form';

const USER_TYPES = [
  'Grasshopper Scout',
  'Cub Scout',
  'Scout',
  'Venture Scout',
  'Rover Scout',
  'Employee',
  'Admin'
];

const AUTH_METHODS = [
  'Mobile Number',
  'Email'
];

const UserForm = ({ onSubmit, initialData, submitLabel = 'Submit' }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm({
    defaultValues: initialData || {
      name: '',
      phoneNumber: '',
      did: '',
      email: '',
      userType: '',
      authMethod: '',
    }
  });

  const onSubmitForm = (data) => {
    onSubmit(data);
    if (!initialData) reset(); // Only reset if it's a new user form
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          {...register('name', { 
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' }
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Phone Number
        </label>
        <input
          {...register('phoneNumber', {
            required: 'Phone number is required',
            pattern: {
              value: /^\+?[1-9]\d{1,14}$/,
              message: 'Please enter a valid phone number'
            }
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-xs italic">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          DID
        </label>
        <input
          {...register('did', {
            required: 'DID is required'
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.did && (
          <p className="text-red-500 text-xs italic">{errors.did.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          User Type
        </label>
        <select
          {...register('userType', {
            required: 'User type is required'
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a user type</option>
          {USER_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.userType && (
          <p className="text-red-500 text-xs italic">{errors.userType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Authentication Method
        </label>
        <select
          {...register('authMethod', {
            required: 'Authentication method is required'
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select an authentication method</option>
          {AUTH_METHODS.map(method => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
        {errors.authMethod && (
          <p className="text-red-500 text-xs italic">{errors.authMethod.message}</p>
        )}
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="bg-[#2F6148] hover:bg-[#2E3930] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default UserForm; 