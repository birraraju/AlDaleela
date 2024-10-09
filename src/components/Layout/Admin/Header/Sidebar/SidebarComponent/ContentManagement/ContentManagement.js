import React, { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import PinPoint from '../../../../../../../assets/Admin/logo/imageContentMangePin.png';
import MediaPinPoint from '../../../../../../../assets/Admin/logo/imagePinMedia.png';

const users = [
  { username: "User name", email: "user@gmail.com", Datetime: "2024-10-11 09:22:25", poiName: "Al Makhtabshah", Organization: "DMT", classification: "Marine", municipality: "Abu Dhabi", media: "3" },
  { username: "User name", email: "user@gmail.com", Datetime: "2024-10-11 09:22:25", poiName: "Al Qahhah", Organization: "DMT", classification: "Terrestrial", municipality: "Al Dhafra", media: "2" },
  { username: "User name", email: "ctive@gmail.com", Datetime: "2024-10-11 09:22:25", poiName: "Al Abhuth", Organization: "DMT", classification: "Marine", municipality: "Al Dhafra", media: "5" },
  { username: "User name", email: "user@gmail.com", Datetime: "2024-10-11 09:22:25", poiName: "Al Buwem", Organization: "DMT", classification: "Island", municipality: "Al Dhafra", media: "12" },
  { username: "User name", email: "user@gmail.com", Datetime: "2024-10-11 09:22:25", poiName: "Al Khabaq", Organization: "DMT", classification: "Island", municipality: "Abu Dhabi", media: "1" },
  // ... other users
];

const CustomCheckbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={`peer h-4 w-4 shrink-0 rounded-sm border border-[#909090] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#036068] data-[state=checked]:text-primary-foreground ${className}`}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
CustomCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export default function UserManagement() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const tableRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollPercentage(scrollPercentage);
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex h-[calc(100vh-6rem)]">
      <div className="bg-white p-8 rounded-lg shadow-sm gap-y-2 flex flex-col flex-grow overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[22px] bg-fontFamily-omnes-0 text-[#464646]">Content Management</h2>
        </div>

        <hr className="border-t border-gray-300 my-4" />

        <div className="overflow-hidden flex-grow relative">
          <div ref={tableRef} className="overflow-x-auto overflow-y-auto absolute inset-0 pr-4">
            <table className="w-full">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="text-left text-sm font-medium text-gray-500 border-b">
                  <th className="pb-3 font-medium font-omnes text-[14px] text-[#667085] pl-3">Username</th>
                  <th className="pb-3 font-medium font-omnes text-[14px] text-[#667085] pr-4">Email id</th>
                  <th className="pb-3 font-medium font-omnes text-[14px] text-[#667085] pr-4">Date & time</th>
                  <th className="pb-3 font-medium font-omnes text-[14px] text-[#667085] pr-4">POI Name</th>
                  <th className="pb-3 font-medium font-omnes text-[14px] text-[#667085] pr-4">Organization</th>
                  <th className="pb-3 font-medium font-omnes text-[14px] text-[#667085] pr-4">Classification</th>
                  <th className="pb-3 font-medium font-omnes text-[14px] text-[#667085] pr-4">Municipality</th>
                  <th className="pb-3 font-medium font-omnes text-[14px] text-[#667085] flex gap-x-1 pr-4">Media<img src={MediaPinPoint} className='h-4' alt="" /></th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-[#D5E5DE] bg-opacity-30" : "bg-white"}>
                    <td className="py-2 font-medium text-[14px] text-[#101828] font-omnes pl-3">{user.username}</td>
                    <td className="py-2 font-medium text-[14px] text-[#101828] font-omnes pr-4">{user.email}</td>
                    <td className="py-2 font-medium text-[14px] text-[#101828] font-omnes pr-4">{user.Datetime}</td>
                    <td className="py-2 font-medium text-[14px] text-[#101828] font-omnes pr-4">{user.poiName}</td>
                    <td className="py-2 font-medium text-[14px] text-[#101828] font-omnes pr-4">{user.Organization}</td>
                    <td className="py-2 font-medium text-[14px] text-[#101828] font-omnes pr-4">{user.classification}</td>
                    <td className="py-2 font-medium text-[14px] text-[#101828] font-omnes pr-4">{user.municipality}</td>
                    <td className="py-2 font-medium text-[14px] text-[#101828] font-omnes pr-4">{user.media}</td>
                    <td className="py-2">
                      <button className="text-red-500 hover:text-red-600">
                        <img src={PinPoint} alt="" className='h-7' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-2 bg-gray-200 rounded-full mr-3 mt-12 mb-10 relative">
        <div 
          className="w-full bg-[#B2CACC] absolute rounded-full transition-all duration-300 ease-out"
          style={{
            height: `${scrollPercentage}%`,
            top: '0',
          }}
        ></div>
      </div>
    </div>
  );
}
