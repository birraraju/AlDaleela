import { Button } from "../../../../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../ui/popover";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export default function Category({ inputClicked,isLangArab, setInputClicked }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Category");

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setIsOpen(false);
  };

  return (
    <div
      onClick={() => setInputClicked(false)}
      className="absolute bottom-1 right-1.5 z-[2]"
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <Button
            variant={"ghost"}
            className={`rounded-full mobile_s:px-2 laptop_m:px-4 py-2 sm:h-6 h-7 bg-white bg-opacity-50 ${
              inputClicked ? "text-black" : "text-white"
            }`}
          >
            {(selectedCategory === "Category") ?(isLangArab?"الفئة":selectedCategory):selectedCategory}
            {isOpen ? (
              <FaCaretUp className="ml-2" />
            ) : (
              <FaCaretDown className="ml-2" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-32 h-52 overflow-y-scroll categories-scroll">
          <div>
            {categories.map((category) => (
              <div
                key={category.name}
                className="text-sm py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleCategorySelect(category.name)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

const categories = [
  { name: "Tawi" },
  { name: "Island" },
  { name: "Maskar" },
  { name: "Bad" },
  { name: "Ghail" },
  { name: "Burga" },
  { name: "Niqa" },
  { name: "Seh" },
];
