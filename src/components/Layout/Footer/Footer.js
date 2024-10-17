import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";
import PropTypes from 'prop-types';
import "./Footer.css";
import { useTheme } from '../../Layout/ThemeContext/ThemeContext'; // Import the theme context


export default function Footer({ handleMenuItemClick, resetTrigger }) {
  const [currentMenuPosition, setCurrentMenuPosition] = useState(0);
  const [currentItemDisplay, setCurrentItemDisplay] = useState("none");
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const menuItemsRef = useRef([]);
  const navIndicatorRef = useRef(null);
  const { t } = useTranslation();
  const { isDarkMode,isLangArab } = useTheme(); // Access the dark mode state


  const headingsMap = {
    0: t( isLangArab?"معرض الخريطة الأساسية":"Base Map Gallery"),
    1: t(isLangArab?"علامات مرجعية":"Bookmarks"),
    2: t( isLangArab?"القياس":"Measurment"),
    3: t( isLangArab? "دبوس مُنقَطِع":'Dropped Pin'),
    4: t( isLangArab? "مشاركة": "Share"),
    5: t( isLangArab?"تصدير البيانات": "Export Data"),
    6: t( isLangArab?"طباعة البيانات": "Print Data"),
  };

  const handleFooterItemClick = useCallback((e, index, isExpanded) => {
    e.preventDefault();

    if (index <= 4) {
      setIsExpanded(false);
    }

    if (index === 4) {
      setIsExpanded(true);
      // const index5Element = menuItemsRef.current[5];
      // if (index5Element) {
      //   setActiveMenuIndex(5);
      //   setSelectedIndex(5);
      //   index5Element.classList.add("sc-current");

      //   menuItemsRef.current.forEach((item, idx) => {
      //     if (item && idx !== 5) {
      //       item.classList.remove("sc-current");
      //     }
      //   });

      //   const position = index5Element.offsetLeft;
      //   setCurrentMenuPosition(position);
      //   setCurrentItemDisplay("block");

      //   const menuIndicator = document.querySelector(".sc-nav-indicator");
      //   if (menuIndicator) {
      //     menuIndicator.style.left = `${position}px`;
      //   }

      //   const menuBar = document.querySelector(".sc-bottom-bar");
      //   if (menuBar) {
      //     menuBar.style.backgroundPosition = `252px`;
      //     menuBar.style.backgroundImage = document.body.classList.contains('theme-dark')
      //       ? 'radial-gradient(circle at 38px 4px, transparent 28px, rgba(0, 0, 0, 0.2) 29px)'
      //       : 'radial-gradient(circle at 38px 4px, transparent 28px, rgba(18, 69, 41, 0.2) 29px)';
      //   }

      //   handleMenuItemClick(e, 5);
      // }
      return;
    }

    const clickedElement = e.currentTarget;
    const position = clickedElement.offsetLeft;
    setCurrentMenuPosition(position);
    setCurrentItemDisplay("block");

    const menuIndicator = document.querySelector(".sc-nav-indicator");
    if (menuIndicator) {
      menuIndicator.style.left = `${position}px`;
    }

    const menuBar = document.querySelector(".sc-bottom-bar");
    if (menuBar) {
      let size = position - 11;
      if (isExpanded && (index === 5 || index === 6)) {
        size = position - 11;
      } else if (isExpanded && (index === 2)) {
        size = position + 4;
      } else if (isExpanded && (index === 3)) {
        size = position + 11;
      } else if (isExpanded && (index === 1)) {
        size = position - 3;
      } else if (isExpanded && (index === 0)) {
        size = position - 11;
      }
      menuBar.style.backgroundPosition = `${size}px`;
      menuBar.style.backgroundImage = document.body.classList.contains('theme-dark')
        ? 'radial-gradient(circle at 38px 4px, transparent 28px, rgba(0, 0, 0, 0.2) 29px)'
        : 'radial-gradient(circle at 38px 4px, transparent 28px, rgba(18, 69, 41, 0.2) 29px)';
    }

    setActiveMenuIndex(index);
    setSelectedIndex(index);
    menuItemsRef.current.forEach(item => item && item.classList.remove("sc-current"));
    clickedElement.classList.add("sc-current");

    handleMenuItemClick(e, index);
  }, [handleMenuItemClick]);

  useEffect(() => {
    if (resetTrigger) {
      setCurrentMenuPosition(0);
      setCurrentItemDisplay("none");
      setActiveMenuIndex(0);
      setIsExpanded(false);
      setSelectedIndex(null);

      const menuBar = document.querySelector(".sc-bottom-bar");
      if (menuBar) {
        menuBar.style.backgroundPosition = ``;
        menuBar.style.backgroundImage = document.body.classList.contains('theme-dark') ? '' : '';
      }

      menuItemsRef.current.forEach(item => item && item.classList.remove("sc-current"));

      const menuIndicator = document.querySelector(".sc-nav-indicator");
      if (menuIndicator) {
        menuIndicator.style.left = '0px';
      }
    }
  }, [resetTrigger]);

  const handleMouseEnter = () => {
    if (selectedIndex === null || selectedIndex >= 5) {
      setIsExpanded(true);
    }
  };


  return (
    
    <div
      className={`sc-bottom-bar flex justify-between tab:h-[65px]  sm:h-[60px] h-[50px] ${isDarkMode ? 'bg-[#152227CC]' : ''}  no-select ${isExpanded ? ' tab:w-[400px] sm:w-[300px] w-[300px] ' : ' tab:w-[350px] sm:w-[300px] w-[300px]'}`}
    >
      {isLangArab? (Array.from({ length: 7 })
    .map((_, index) => index) // Create an array of indices
    .reverse() // Reverse the order
    .map((index) => (
      <React.Fragment key={index}>
        {index < 4 && (
          <div
            className={`sc-menu-wrp ${selectedIndex === index ? 'sc-current' : ''}`}
            ref={el => menuItemsRef.current[index] = el}
            onClick={(e) => handleFooterItemClick(e, index, isExpanded)}
            data-tooltip-id={`tooltip-${index}`}
          >
            <button
              className="sc-menu-item"
              data-tooltip-content={headingsMap[index]}
              data-tooltip-id={`tooltip-${index}`}
            >
              <img
                src={isDarkMode ? `${process.env.PUBLIC_URL}/Footer/dark/darkicon${index + 1}.svg` : `${process.env.PUBLIC_URL}/Footer/icon${index + 1}.svg`}
                className="icon"
                alt={`Icon ${index + 1}`}
                style={{ width: '200px', height: '200px' }}
              />
              <Tooltip
                id={`tooltip-${index}`}
                place="top"
                className="ToolTipEnvi"
                style={{
                  backgroundColor: 'transparent',
                  color: isDarkMode ? 'white' : 'black',
                  fontFamily: 'Poppins',
                  fontWeight: 'Bold',
                  fontSize: '14px',
                  padding: '0',
                  boxShadow: 'none',
                }}
              />
            </button>
          </div>
        )}
        {index === 4 && (
          <div
            className={`sc-menu-wrp ${isExpanded ? 'hidden' : ''}`}
            ref={el => menuItemsRef.current[index] = el}
            onClick={(e) => handleFooterItemClick(e, index, isExpanded)}
            data-tooltip-id={`tooltip-${index}`}
            onClickCapture={handleMouseEnter}
          >
            <button
              className="sc-menu-item bg-transparent border-4 w-12"
              data-tooltip-content={headingsMap[index]}
              data-tooltip-id={`tooltip-${index}`}
            >
              <img
                src={isDarkMode ? `${process.env.PUBLIC_URL}/Footer/dark/darkicon${index + 1}.svg` : `${process.env.PUBLIC_URL}/Footer/icon${index + 1}.svg`}
                className="icon"
                alt={`Icon ${index + 1}`}
                style={{ width: '200px', height: '200px' }}
              />
              <Tooltip
                id={`tooltip-${index}`}
                place="top"
                className="ToolTipEnvi"
                style={{
                  backgroundColor: 'transparent',
                  color: isDarkMode ? 'white' : 'black',
                  fontFamily: 'Poppins',
                  fontWeight: 'Bold',
                  fontSize: '14px',
                  padding: '0',
                  boxShadow: 'none',
                }}
              />
            </button>
          </div>
        )}
        {index > 4 && (
          <div
            className={`sc-menu-wrp ${isExpanded ? 'visible' : 'hidden'} ${selectedIndex === index ? 'sc-current' : ''}`}
            ref={el => menuItemsRef.current[index] = el}
            onClick={(e) => handleFooterItemClick(e, index, isExpanded)}
            data-tooltip-id={`tooltip-${index}`}
          >
            <button
              className="sc-menu-item"
              data-tooltip-content={headingsMap[index]}
              data-tooltip-id={`tooltip-${index}`}
            >
              <img
                src={isDarkMode ? `${process.env.PUBLIC_URL}/Footer/dark/darkicon${index + 1}.svg` : `${process.env.PUBLIC_URL}/Footer/icon${index + 1}.svg`}
                className="icon"
                alt={`Icon ${index + 1}`}
                style={{ width: '200px', height: '200px' }}
              />
              <Tooltip
                id={`tooltip-${index}`}
                place="top"
                className="ToolTipEnvi"
                style={{
                  backgroundColor: 'transparent',
                  color: isDarkMode ? 'white' : 'black',
                  fontFamily: 'Poppins',
                  fontWeight: 'Bold',
                  fontSize: '14px',
                  padding: '0',
                  boxShadow: 'none',
                }}
              />
            </button>
          </div>
        )}
      </React.Fragment>
    ))):(Array.from({ length: 7 }).map((_, index) => (
        <React.Fragment key={index}>
          
          {index < 4 && (
            <div
              className={`sc-menu-wrp ${selectedIndex === index ? 'sc-current' : ''}`}
              ref={el => menuItemsRef.current[index] = el}
              onClick={(e) => handleFooterItemClick(e, index, isExpanded)}
              data-tooltip-id={`tooltip-${index}`}
            >
              <button
                className="sc-menu-item"
                data-tooltip-content={headingsMap[index]}
                data-tooltip-id={`tooltip-${index}`}
              >
                <img
                  src={isDarkMode ? `${process.env.PUBLIC_URL}/Footer/dark/darkicon${index + 1}.svg` : `${process.env.PUBLIC_URL}/Footer/icon${index + 1}.svg`}
                  className="icon"
                  alt={`Icon ${index + 1}`}
                  style={{ width: '200px', height: '200px' }}
                />
                <Tooltip 
                  id={`tooltip-${index}`} 
                  place="top" 
                  className="ToolTipEnvi"
                  style={{
                    backgroundColor: 'transparent',
                    color: isDarkMode ? 'white':'black',
                    fontFamily: 'Poppins',
                    fontWeight: 'Bold',
                    fontSize: '14px',
                    padding: '0',
                    boxShadow: 'none'
                  }}
                />
              </button>
            </div>
          )}
          {index === 4 && (
            <div
              className={`sc-menu-wrp ${isExpanded ? 'hidden' : ''}`}
              ref={el => menuItemsRef.current[index] = el}
              onClick={(e) => handleFooterItemClick(e, index, isExpanded)}
              data-tooltip-id={`tooltip-${index}`}
              onClickCapture={handleMouseEnter}
            >
              <button
                className="sc-menu-item bg-transparent border-4 w-12"
                data-tooltip-content={headingsMap[index]}
                data-tooltip-id={`tooltip-${index}`}
              >
                <img
                  src={isDarkMode ? `${process.env.PUBLIC_URL}/Footer/dark/darkicon${index + 1}.svg` : `${process.env.PUBLIC_URL}/Footer/icon${index + 1}.svg`}
                  className="icon"
                  alt={`Icon ${index + 1}`}
                  style={{ width: '200px', height: '200px' }}
                />
                <Tooltip 
                  id={`tooltip-${index}`} 
                  place="top" 
                  className="ToolTipEnvi"
                  style={{
                    backgroundColor: 'transparent',
                    color: isDarkMode ? 'white':'black',
                    fontFamily: 'Poppins',
                    fontWeight: 'Bold',
                    fontSize: '14px',
                    padding: '0',
                    boxShadow: 'none'
                  }}
                />
              </button>
            </div>
          )}
          {index > 4 && (
            <div
              className={`sc-menu-wrp ${isExpanded ? 'visible' : 'hidden'} ${selectedIndex === index ? 'sc-current' : ''}`}
              ref={el => menuItemsRef.current[index] = el}
              onClick={(e) => handleFooterItemClick(e, index, isExpanded)}
              data-tooltip-id={`tooltip-${index}`}
            >
              <button
                className="sc-menu-item"
                data-tooltip-content={headingsMap[index]}
                data-tooltip-id={`tooltip-${index}`}
              >
                <img
                  src={isDarkMode ? `${process.env.PUBLIC_URL}/Footer/dark/darkicon${index + 1}.svg` : `${process.env.PUBLIC_URL}/Footer/icon${index + 1}.svg`}
                  className="icon"
                  alt={`Icon ${index + 1}`}
                  style={{ width: '200px', height: '200px' }}
                />
                <Tooltip 
                  id={`tooltip-${index}`} 
                  place="top" 
                  className="ToolTipEnvi"
                  style={{
                    backgroundColor: 'transparent',
                    color: isDarkMode ? 'white':'black',
                    fontFamily: 'Poppins',
                    fontWeight: 'Bold',
                    fontSize: '14px',
                    padding: '0',
                    boxShadow: 'none'
                  }}
                />
              </button>
            </div>
          )}
        </React.Fragment>
      )))}
      <button
        ref={navIndicatorRef}
        className="sc-nav-indicator"
        style={{
          left: `${currentMenuPosition}px`,
          display: currentItemDisplay,
        }}
      />
    </div>
  );
}

Footer.propTypes = {
  handleMenuItemClick: PropTypes.func.isRequired,
  resetTrigger: PropTypes.bool.isRequired,
};