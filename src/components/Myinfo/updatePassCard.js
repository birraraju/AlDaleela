import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons

const BasicInformationForm = ({ onEditInfo }) => {
  // State for password information
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // State for password visibility
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo({ ...passwordInfo, [name]: value });
  };

  const handleUpdate = () => {
    // Perform update logic here
    console.log('Updated password info:', passwordInfo);
    onEditInfo();
    // Example: You could make an API call here to save the updated information
  };

  const handleCancel = () => {
    // Clear the password fields or perform any cancel logic
    setPasswordInfo({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="py-4 mt-4 space-y-7">
      <div className="bg-transparent outline-none rounded-lg p-0 space-y-3">
        <div className="grid grid-cols-1 gap-y-8 p-2">
          {/* Current Password Field */}
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Current Password</label>
            <div className="relative">
              <input
                type={showPassword.currentPassword ? 'text' : 'password'}
                name="currentPassword"
                value={passwordInfo.currentPassword}
                onChange={handleInputChange}
                className="w-full text-xs bg-white font-medium border border-white rounded-lg outline-none p-3"
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('currentPassword')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <FontAwesomeIcon icon={showPassword.currentPassword ? faEye : faEyeSlash} />
              </button>
            </div>
          </div>

          {/* New Password Field */}
          <div className="space-y-1">
            <label className="text-sm text-gray-500">New Password</label>
            <div className="relative">
              <input
                type={showPassword.newPassword ? 'text' : 'password'}
                name="newPassword"
                value={passwordInfo.newPassword}
                onChange={handleInputChange}
                className="w-full text-xs bg-white font-medium border border-white rounded-lg outline-none p-3"
                placeholder="Enter New Password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('newPassword')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <FontAwesomeIcon icon={showPassword.newPassword ? faEye : faEyeSlash} />
              </button>
            </div>
          </div>

          {/* Confirm New Password Field */}
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPassword.confirmNewPassword ? 'text' : 'password'}
                name="confirmNewPassword"
                value={passwordInfo.confirmNewPassword}
                onChange={handleInputChange}
                className="w-full text-xs bg-white font-medium border border-white rounded-lg outline-none p-3"
                placeholder="Confirm New Password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmNewPassword')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <FontAwesomeIcon icon={showPassword.confirmNewPassword ? faEye : faEyeSlash} />
              </button>
            </div>
          </div>

          {/* Button Row */}
          <div className="flex justify-between items-center space-x-2">
            <button
              className="w-auto py-3 px-14 bg-white text-xs border border-gray-300 rounded-lg"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="w-auto py-3 px-14 bg-teal-700 text-xs border border-gray-300 rounded-lg"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformationForm;
