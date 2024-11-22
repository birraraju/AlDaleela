// import { ChevronLeft } from "lucide-react";
// import SideBarImg from '../../../../../assets/Admin/logo/imageSideBar.png';
// import { useTheme } from '../../../../Layout/ThemeContext/ThemeContext';

// export default function Sidebar({ activeItem, onItemClick }) {
//   const { isDarkMode } = useTheme();

//   return (
//     <div
//     className={`w-[190px]  h-[calc(100vh-4rem)] text-white py-8 fixed top-16 left-0 z-10 ${
//       isDarkMode
//         ? 'bg-[#1F302B] '
//         : 'bg-teal-800'
//     }`}
//   >      <a href={`/${process.env.REACT_APP_BASE_URL}`}>
//         <button className="flex px-7 items-center text-[#D1FAFF] text-[14px] mb-1">
//           <ChevronLeft className="w-4 h-6" />
//           Back
//         </button>
//       </a>
//       <nav className="pt-6 px-3 flex-1">
//         <ul className="space-y-2">
//           {["User Management", "Content Management", "Feedback", "User Activity Log"].map((item) => (
//             <li key={item}>
//               <button
//                 className={`w-full text-[14px] text-left px-4 py-2 rounded ${
//                   activeItem === item
//                     ? "bg-white/50 backdrop-blur-sm"
//                     : "hover:bg-white/50 hover:backdrop-blur-sm"
//                 }`}
//                 onClick={() => onItemClick(item)}
//               >
//                 {item}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//       <div className="w-[248.86px]">
//         <img src={SideBarImg} className="w-[448.86px]" alt="Sidebar decoration" />
//       </div>
//     </div>
//   );
// }

import { ChevronLeft, Menu, X } from "lucide-react"; // Use ChevronLeft for back, Menu & X for toggling
import { useState } from "react";
import SideBarImg from '../../../../../assets/Admin/logo/imageSideBar.png';
import { useTheme } from '../../../../Layout/ThemeContext/ThemeContext';
import { act } from "@testing-library/react";

export default function Sidebar({ activeItem, onItemClick,isCollapsed, setIsCollapsed }) {
  const { isDarkMode, isLangArab } = useTheme();
  // const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div 
    
      className={`h-[calc(100vh-4rem)] text-white py-8 fixed top-14 h-full ${ isLangArab ? "right-0" :"left-0"} z-10 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-[190px]"
      } ${isDarkMode ? 'bg-[#1F302B]' : 'bg-teal-800'}`}
      style={{ fontFamily: isLangArab ? "'Cairo', sans-serif" : 'inherit' }}
    >
      {/* Container for Back and Toggle Button */}
      <div className="flex justify-between items-center px-3">
        {/* Back Button (Left-aligned) */}
        {!isCollapsed && <a href={`/${process.env.REACT_APP_BASE_URL}`} className="flex items-center text-[#D1FAFF] text-[14px]">
        
          <ChevronLeft className={` ${isLangArab && "rotate-180"} w-4 h-6 `} />
          <span className={`${isCollapsed ? 'hidden' : 'ml-1'}`}>{isLangArab ? "ظهر" :"Back"}</span>
         
        </a>}
        
        {/* Toggle Button (Right-aligned) */}
        {isCollapsed ?<button onClick={toggleSidebar} className="text-[#D1FAFF] flex laptop_s:hidden">
        <X className="w-6 h-6" />
        </button>:
        <button onClick={toggleSidebar} className="text-[#D1FAFF] flex laptop_s:hidden">
           <Menu className="w-6 h-6" /> 
        </button>}
      </div>
          
      {/* Sidebar Content */}
      {!isCollapsed && (
        <>
          
          <nav  className="pt-6 px-3 flex-1">
            <ul className={` space-y-2`}>
              {[{LabelContent:(isLangArab?"إدارة المستخدمين":"User Management"), active:"User Management"}, {LabelContent:(isLangArab ? "إدارة المحتوى" :"Content Management"),active:"Content Management"},{LabelContent:(isLangArab ? "ردود الفعل":"Feedback"), active:"Feedback"}, {LabelContent:(isLangArab?"سجل نشاط المستخدم":"User Activity Log"),active:"User Activity Log"}].map((item) => (
                <li key={item.active}>
                  <button
                    className={`w-full text-[12px] text-left px-4 py-2 rounded  ${
            isLangArab ? "text-right" : "text-left"
          } ${
                      activeItem === item.active
                        ? "bg-white/50 backdrop-blur-sm"
                        : "hover:bg-white/50 hover:backdrop-blur-sm"
                    }`}
                    onClick={() => onItemClick(item.active)}
                  >
                    {item.LabelContent}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="w-[248.86px]" dir={isLangArab && "rtl"}>
            <img src={SideBarImg} className={`${isLangArab? " translate-x-16 w-full" :"w-[448.86px]"}`} alt="Sidebar decoration" />
          </div>
        </>
      )}
    </div>
  );
}
