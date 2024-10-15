import React, { useState } from 'react';
import InfoLogo from '@/assets/arab-man.png';

const BasicInformationForm = () => {
  // State with default user information
  const [userInfo, setUserInfo] = useState({
    name: "Hamad",
    email: "useremailid@gmail.com",
    phoneNumber: "+971521234567",
    organization: "ABIA",
    country: "United Arab Emirates"
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleUpdate = () => {
    // Perform update logic here
    console.log('Updated user info:', userInfo);
    alert("test")
    // Example: You could make an API call here to save the updated information
  };

  return (
    <div className="py-4 space-y-6">
      <div className="flex items-center justify-center z-40 space-x-6 mb-4">
        <div className="relative bg-transparent rounded-full p-1">
          <img 
            src={InfoLogo} 
            className="relative h-[120px] z-10 w-[120px] text-white" 
            alt="User Info" 
          />
          <label className="absolute bottom-3 border-b-0 rounded-b-full right-5 flex items-center justify-center bg-black/80 text-white px-8 z-20 cursor-pointer">
            Edit
          </label>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="text-base font-bold">Basic Information</h3>
        <hr />
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 p-5">
          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Name</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              className="w-32 text-xs bg-[#d5ecdf] font-medium border border-gray-300 rounded outline-none p-1"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Email Id</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="w-32 text-xs font-medium bg-[#d5ecdf] border border-gray-300 outline-none rounded p-1"
            />
          </div>

          {/* Phone Number Field */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={userInfo.phoneNumber}
              onChange={handleInputChange}
              className="w-32 text-xs font-medium border bg-[#d5ecdf] border-gray-300 outline-none rounded p-1"
            />
          </div>

          {/* Organization Field */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Organization</label>
            <input
              type="text"
              name="organization"
              value={userInfo.organization}
              onChange={handleInputChange}
              className="w-32 text-xs font-medium border bg-[#d5ecdf] outline-none border-gray-300 rounded p-1"
            />
          </div>

          {/* Country Dropdown */}
          <div className="col-span-1 space-y-1">
            <label className="text-xs text-gray-500">Country</label>
            <select
              name="country"
              value={userInfo.country}
              onChange={handleInputChange}
              className="w-32 text-xs font-medium border rounded p-1 outline-none focus:border-transparent"
            >
              <option value="">Select Country</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
            </select>
          </div>

          {/* Update Button */}
          <div className="col-span-1 space-y-1 flex justify-start items-end">
            <button
              className="w-auto px-8 py-2 bg-gradient-to-r from-green-800 to-green-700 text-xs border border-gray-300 rounded-lg"
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
