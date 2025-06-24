import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/authContext/AuthContext';
import axios from 'axios';
import Modal from '../forms/Modal'; // Ensure the correct path to the Modal component

const UserProfile = () => {
  const { profile, fetchProfileAction, error, userAuth } = useContext(authContext);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    fetchProfileAction();
  }, []);

  useEffect(() => {
    if (profile && profile.imageUrl) {
      setImageUrl(`http://localhost:9000/public/images/${profile.imageUrl}`);
    }
  }, [profile]);

  const handleImageChange = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', userAuth.userAuth.id);
    axios.put('http://localhost:9000/api/v1/users/upload', formData)
      .then(res => {
        if (res.data.data && res.data.data.imageUrl) {
          setImageUrl(`http://localhost:9000/public/images/${res.data.data.imageUrl}`);
          setIsModalOpen(false); // Close the modal after successful upload
        }
      })
      .catch(err => console.log(err));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    axios.put('http://localhost:9000/api/v1/users/', {
      userId: userAuth.userAuth.id,
      currentPassword,
      newPassword
    })
    .then(res => {
      console.log(res);
      console.log("Password updated successfully");
      setIsPasswordModalOpen(false); // Close the password modal after successful update
    })
    .catch(err => {
      if (err.response && err.response.data && err.response.data.message) {
      setPasswordError(err.response.data.message); // Set error message from backend
      } else {
        setPasswordError('An error occurred. Please try again.'); // Default error message
      }
    });
  };

  return (
    <div className="container mx-auto p-4 border border-gray-300 rounded-lg shadow-lg max-w-lg">
      <div className="profile-picture flex flex-col items-center mb-4">
        <img
          src={imageUrl || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover mb-2"
        />
        <button
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          {imageUrl ? 'Edit' : 'Add'} Image
        </button>
      </div>
      <div className="flex items-center mb-4">
        <label className="w-32 font-bold">Full Name:</label>
        <p className="text-lg">{profile?.fullname}</p>
      </div>
      <div className="flex items-center mb-4">
        <label className="w-32 font-bold">Email:</label>
        <p className="text-lg">{profile?.email}</p>
      </div>
      <div className="flex justify-center items-center mb-4">
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          onClick={() => setIsPasswordModalOpen(true)}
        >
          Change Password
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl mb-4">Edit Profile Picture</h2>
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          className="mt-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
        />
        <div className="flex justify-start mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleImageChange}
          >
            Upload
          </button>
        </div>
      </Modal>

      <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)}>
        <h2 className="text-2xl mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label className="block text-gray-700">Current Password</label>
            <input
              type="password"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm New Password</label>
            <input
              type="password"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-start mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Update Password
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserProfile;
