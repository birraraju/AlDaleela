import React from 'react';
import InfoLogo from '@/assets/arab-man.png';

const UserProfile = ({ onEditInfo, onPassWordInfo }) => {
  const userInfo = {
    name: "Hamad",
    email: "useremailid@gmail.com",
    phoneNumber: "+971521234567",
    organization: "ABIA",
    country: "United Arab Emirates",
  };

  return (
    <div className="py-4 mt-4 space-y-14">
      <div className="flex items-start justify-start space-x-6 mb-4">
        <div className="bg-transparent rounded-full p-1">
          <img src={InfoLogo} className="h-[80px] w-[80px]" alt="User" />
        </div>
        <div className="space-y-2">
          <h2 className="text-base font-semibold">{userInfo.name}</h2>
          <p className="text-sm text-gray-500">{userInfo.email}</p>

          <div className="flex space-x-2 mt-2">
            <button
              className="w-auto px-4 text-xs py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              onClick={onEditInfo}
            >
              Edit Info
            </button>
            <button 
              onClick={onPassWordInfo} 
              className="w-auto px-4 py-2 bg-white text-xs border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 space-y-3 shadow">
        <h3 className="text-base font-bold">Basic Information</h3>
        <hr />
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 p-5">
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Name</p>
            <p className="text-xs font-medium">{userInfo.name}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-gray-500">Email Id</p>
            <p className="text-xs font-medium">{userInfo.email}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-gray-500">Phone Number</p>
            <p className="text-xs font-medium">{userInfo.phoneNumber}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-gray-500">Organization</p>
            <p className="text-xs font-medium">{userInfo.organization}</p>
          </div>

          <div className="col-span-2 space-y-1">
            <p className="text-xs text-gray-500">Country</p>
            <p className="text-xs font-medium">{userInfo.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
