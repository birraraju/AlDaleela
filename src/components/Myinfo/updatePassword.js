// import { X } from 'lucide-react'; //User
// import { useState } from 'react';
// import Passwordupadate from './updatePassCard'
// import UpdateSuccess from './updateSuccess'




// export default function UserInfoCard() {
//   const [isOpen, setIsOpen] = useState(true);
//   const [editInfo, setEditInfo] = useState(false);

//   const handleEditInfo = () => {
//     setEditInfo(true);
//   };

//   return (
//     <>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
//           <div className="w-full max-w-sm mx-auto bg-white/60 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-lg relative">
//             {!editInfo ? (<><div className="flex flex-row items-center justify-between pb-2 border-b border-gray-300">
//               <h2 className="text-lg text-black/70 font-semibold">Change Password</h2>
//               <button
//                 className="p-2 rounded-md hover:bg-gray-200"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <X className="h-6  w-6" />
//                 <span className="sr-only">Close</span>
//               </button>
//             </div>
//             <Passwordupadate onEditInfo={handleEditInfo}/>
//             </>):
//             <UpdateSuccess onEditInfo={handle}/>
//             }
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
