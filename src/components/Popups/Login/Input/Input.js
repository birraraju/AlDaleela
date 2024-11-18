import React, { useState } from "react";

export default function Input({
  placeholder,
  required = false,
  type = "text",
  name,
  onChange,
  isLangArab
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setHasContent(!!e.target.value); // Check if there's content
  };

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
    setHasContent(!!e.target.value); // Update content state as user types
  };


  return (
    <div dir={isLangArab && "rtl"} className="relative">
      <input
        type={type}
        name={name}
        required={required}
        className={`w-full h-[48px]  px-4 py-2 text-sm text-black  bg-white border border-gray-300 rounded-[10px] focus:outline-none
        ${isFocused || hasContent ? "placeholder-transparent" : "placeholder-gray-400"}`}
        onFocus={handleFocus}
        // placeholder={placeholder}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {/* Floating label with red asterisk if required */}
      <div
        className={`absolute w-full font-omnes text-[14px] px-3  top-3 text-sm pointer-events-none transition-all
        ${isFocused || hasContent ? "text-transparent" : "text-black"}
        ${isFocused || hasContent ? " text-transparent" : ""}`}
      >
        <span className={` ${isFocused || hasContent ? " text-transparent" : "text-gray-300"}`}>{placeholder}</span>{"  "}
        {required && (
          <span className={`${isFocused || hasContent ? "text-transparent" : "text-red-500"}`}>
            *
          </span>
        )}
      </div>
    </div>
  );
}
