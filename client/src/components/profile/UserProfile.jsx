import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/authContext/AuthContext';
import axios from 'axios';
import Modal from '../forms/Modal';
 // Ensure the correct path to the Modal component

const UserProfile = () => {
  const { profile, fetchProfileAction, error, userAuth } = useContext(authContext);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          {imageUrl ? 'Edit Image' : 'Add Image'}
        </button>
      </div>
      <div className="flex items-center mb-4">
        <label className="w-32 font-bold">Full Name:</label>
        <p className="text-lg">{profile?.fullname}</p>
      </div>
      <div className="flex items-center">
        <label className="w-32 font-bold">Email:</label>
        <p className="text-lg">{profile?.email}</p>
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
            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleImageChange}
          >
            Upload
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
