// import { useState } from 'react'
// import SideLayout from "@/components/Sidelayout/FeedbackLayout/FeedbackLayout"
// import { X, SmilePlus, Smile, Meh, Frown } from "lucide-react"

// interface FeedbackProps {
//   onClose: () => void
// }

// export default function Feedback({ onClose }: FeedbackProps) {
//   const [rating, setRating] = useState<string | null>(null)

//   const ratings = [
//     { value: 'Excellent', icon: SmilePlus, color: 'text-green-500' },
//     { value: 'Good', icon: Smile, color: 'text-green-400' },
//     { value: 'Average', icon: Meh, color: 'text-yellow-400' },
//     { value: 'Poor', icon: Frown, color: 'text-orange-400' },
//     { value: 'Bad', icon: Frown, color: 'text-red-500' },
//   ]

//   return (
//     <div className="z-50 ">
// <SideLayout  >
// <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-xl font-semibold">Feedback</h2>
//           <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
//             <X className="w-6 h-6" />
//           </button>
//         </div>
//         <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
//           <div className="flex justify-between">
//             {ratings.map((item) => (
//               <button
//                 key={item.value}
//                 className={`flex flex-col items-center space-y-1 ${
//                   rating === item.value ? 'opacity-100' : 'opacity-50'
//                 }`}
//                 onClick={() => setRating(item.value)}
//               >
//                 <item.icon className={`w-8 h-8 ${item.color}`} />
//                 <span className="text-xs">{item.value}</span>
//               </button>
//             ))}
//           </div>
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Nam
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 placeholder="Enter Your Name"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Enter Your Email Address"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div>
//               <label htmlFor="thoughts" className="block text-sm font-medium text-gray-700 mb-1">
//                 Please share your thoughts to improve
//               </label>
//               <textarea
//                 id="thoughts"
//                 rows={4}
//                 placeholder="Share Your Thoughts Here"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               ></textarea>
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-end space-x-4 p-4 border-t">
//           <button 
//             className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50" 
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
//             Submit
//           </button>
//         </div>
//       </SideLayout>
//     </div>
//   )
// }