import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { X } from "lucide-react";
import { useTheme } from '../Layout/ThemeContext/ThemeContext';
import EditPOIPoint from '../../assets/Droppedpin/EditPoints.svg';
import { ChevronLeft } from 'lucide-react';

export default function EditAddPOI({
  children,
  onClose,
  isShowEdit
}) {


  const [isOpen, setIsOpen] = useState(true);
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const panelRef = useRef(null);
  const { isDarkMode, isLangArab} = useTheme();
  const poiOptions = [
    { label: "Terrestrial", isHighlighted: false },
    { label: "Marine", isHighlighted: false },
    { label: "Island", isHighlighted: true }
  ];

  const [selectedIndex, setSelectedIndex] = useState(null); // Track the selected item

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };




  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      // Prevents automatic panel close on outside clicks
    }
  };

  useEffect(() => {
    if (isFullyClosed) {
      const timer = setTimeout(onClose, 300);
      return () => clearTimeout(timer);
    }
  }, [isFullyClosed, onClose]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if(!isShowEdit) return null;

  if (isFullyClosed) return null;

  return (
        <div className="p-1 overflow-y-auto h-full">
          {children || (
            <>
              <div className="px-1 py-3">
      <div className="flex-1 gap-2">
        {poiOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => {handleSelect(index);onClose()}} // Set selected index on click
            className={`flex gap-2 px-2 py-1 cursor-pointer ${
              selectedIndex === index ? "bg-[#DFE2E3]" : ""
            }`}
          >
            <img src={EditPOIPoint} className="w-3" alt="Icon" />
            <p>{option.label}</p>
          </div>
        ))}
      </div>
    </div>
            </>
          )}
        </div>
  );
}
