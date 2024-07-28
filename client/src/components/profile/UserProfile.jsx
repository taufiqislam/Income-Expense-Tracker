import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/authContext/AuthContext';

const UserProfile = () => {
  const { profile, fetchProfileAction, error } = useContext(authContext);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProfileAction();
  }, []);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="container mx-auto p-4 border border-gray-300 rounded-lg shadow-lg max-w-lg">
      <div className="profile-picture flex flex-col items-center mb-4">
        <img
          src={selectedImage || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover mb-2"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="mt-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
        />
      </div>
      <div className="flex items-center mb-4">
        <label className="w-32 font-bold">Full Name:</label>
        <p className="text-lg">{profile?.fullname}</p>
      </div>
      <div className="flex items-center">
        <label className="w-32 font-bold">Email:</label>
        <p className="text-lg">{profile?.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
