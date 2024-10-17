import { ChevronLeft } from "lucide-react";
import SideBarImg from '../../../../../assets/Admin/logo/imageSideBar.png';
import { useTheme } from '../../../../Layout/ThemeContext/ThemeContext';

export default function Sidebar({ activeItem, onItemClick }) {
  const { isDarkMode } = useTheme();

  return (
    <div
    className={`w-[190px]  h-[calc(100vh-4rem)] text-white py-8 fixed top-16 left-0 z-10 ${
      isDarkMode
        ? 'bg-[#1F302B] '
        : 'bg-teal-800'
    }`}
  >      <a href={`/${process.env.REACT_APP_BASE_URL}`}>
        <button className="flex px-7 items-center text-[#D1FAFF] text-[14px] mb-1">
          <ChevronLeft className="w-4 h-6" />
          Back
        </button>
      </a>
      <nav className="pt-6 px-3 flex-1">
        <ul className="space-y-2">
          {["User Management", "Content Management", "Feedback", "User Activity Log"].map((item) => (
            <li key={item}>
              <button
                className={`w-full text-[14px] text-left px-4 py-2 rounded ${
                  activeItem === item
                    ? "bg-white/50 backdrop-blur-sm"
                    : "hover:bg-white/50 hover:backdrop-blur-sm"
                }`}
                onClick={() => onItemClick(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-[248.86px]">
        <img src={SideBarImg} className="w-[448.86px]" alt="Sidebar decoration" />
      </div>
    </div>
  );
}
