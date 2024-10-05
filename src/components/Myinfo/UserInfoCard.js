import { X } from 'lucide-react';
import { useState } from 'react';
import BasicInfoUpdate from './BasicInformationForm';
import UserProfile from './UserProfile';
import PasswordUpdate from './updatePassCard'; // Fixed spelling
import UpdateSuccess from './updateSuccess';

export default function UserInfoCard() {
  const [isOpen, setIsOpen] = useState(true);
  const [editInfo, setEditInfo] = useState(false);
  const [isProfileInfo, setIsProfileInfo] = useState(true);
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState(false);

  const handleEditInfo = () => {
    setEditInfo(true);
  };

  const handleUpdateInfo = () => {
    setEditInfo(true);
    setIsProfileInfo(false);
  };

  const handleUpdatePassMsg = () => {
    setUpdateSuccessMsg(true);
  };

  const handleSuccessModelClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
          <div className="w-full max-w-sm mx-auto bg-white/80 backdrop-blur-sm border border-white/30 p-4 rounded-2xl shadow-lg relative">
            <div className="flex flex-row items-center justify-between pb-2 border-b border-gray-300">
              <h2 className="text-xl font-medium">My Info</h2>
              <button
                className="p-2 rounded-md hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            {/* Conditionally render components based on state */}
            {isProfileInfo && editInfo && <BasicInfoUpdate />}
            {isProfileInfo && !editInfo && (
              <UserProfile 
                onEditInfo={handleEditInfo} 
                onPassWordInfo={handleUpdateInfo} 
              />
            )}
            {!isProfileInfo && !updateSuccessMsg && (
              <PasswordUpdate onEditInfo={handleUpdatePassMsg} />
            )}
            {!isProfileInfo && updateSuccessMsg && (
              <UpdateSuccess onCloseModel={handleSuccessModelClose} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
