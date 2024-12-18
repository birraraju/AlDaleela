import React, { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip as ReactTooltip } from "react-tooltip";
import PropTypes from "prop-types";
import "./Footer.css";
import { useTheme } from "../../Layout/ThemeContext/ThemeContext"; // Import the theme context
import usePrevious from "../../../Providers/Hooks/usePrevious"; // Adjust the path
import "react-tooltip/dist/react-tooltip.css";
import Home from "../../../assets/navigations/imageSide2.png";
import HomeDark from "../../../assets/navigations/dark.png"; // Dark theme image path
import ShowPlus from '../../../assets/Footer/PlusShow.svg'
import RoleServices from "../../servicces/RoleServices";
// akjsnjads
export default function Footer({
  handleClose,
  handleMenuItemClick,
  isPlusShow, setisPlusShow,
  setPopup,
  resetTrigger,isExpanded, setIsExpanded,
}) {
  const [currentMenuPosition, setCurrentMenuPosition] = useState(0);
  const [currentItemDisplay, setCurrentItemDisplay] = useState("none");
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  
  const [selectedIndex, setSelectedIndex] = useState(null);

  const menuItemsRef = useRef([]);
  const navIndicatorRef = useRef(null);
  const { t } = useTranslation();
  const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state
  const previousCount = usePrevious(selectedIndex);

  console.log("Previous Index:", previousCount);
  console.log("Current Index:", selectedIndex);
  const headingsMap = {
    0: t(isLangArab ? "معرض الخريطة الأساسية" : "Basemap Gallery"),
    1: t(isLangArab ? "علامات مرجعية" : "Bookmarks"),
    2: t(isLangArab ? "القياس" : "Measurement"),
    3: t(isLangArab ? "دبوس مُنقَطِع" : "Dropped Pin"),
    4: t(isLangArab ? "مشاركة" : "Share"),
    5: t(isLangArab ? "تصدير البيانات" : "Export Map"),
    6: t(isLangArab ? "طباعة البيانات" : "Print Map"),
  };


  const handleFooterItemClick = useCallback(
    (e, index) => {
      e.preventDefault();

      // Prevent recalculation when clicking the same index consecutively
      if (index === selectedIndex) return;

      
      
      // Handle resetting logic for index 4
      if (index === 4) {
        setCurrentMenuPosition(0);
        setCurrentItemDisplay("none");
        setActiveMenuIndex(0);
        setSelectedIndex(null);
        setPopup(null);
        setIsExpanded(true);

        const menuBar = document.querySelector(".sc-bottom-bar");
        if (menuBar) {
          menuBar.style.backgroundPosition = "";
          menuBar.style.backgroundImage = document.body.classList.contains(
            "theme-dark"
          )
            ? ""
            : "";
        }

        menuItemsRef.current.forEach(
          (item) => item && item.classList.remove("sc-current")
        );

        const menuIndicator = document.querySelector(".sc-nav-indicator");
        if (menuIndicator) {
          menuIndicator.style.left = "0px";
        }
        return;
      }

      // Handle menu indicator and background position for other indexes
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
        let size = position - 11; // Default size assignment

        if (isExpanded) {
          switch (index) {
            case 0:
              size = isLangArab ? position - 8 : position - 11;
              break;
            case 1:
              size = isLangArab ? position - 10 : position - 10;
              break;
            case 2:
              size = isLangArab ? position - 10 : position - 10;
              break;
            case 3:
              size = isLangArab ? position - 10 : position - 10;
              break;
            case 4:
            case 5:
            case 6:
              size = position - 11;
              break;
            default:
              break;
          }
        }
        console.log("Current footer size:", size, index);

        menuBar.style.backgroundPosition = `${size}px`;
        menuBar.style.backgroundImage = document.body.classList.contains(
          "theme-dark"
        )
          ? "radial-gradient(circle at 38px 4px, transparent 28px, rgba(0, 0, 0, 0.2) 29px)"
          : isDarkMode?"radial-gradient(circle at 38px 4px, transparent 28px, rgba(0, 0, 0, 0.2) 29px)": "radial-gradient(circle at 38px 4px, transparent 28px, rgba(18, 69, 41, 0.2) 29px)";
      }

      setActiveMenuIndex(index);
      setSelectedIndex(index);
      menuItemsRef.current.forEach(
        (item) => item && item.classList.remove("sc-current")
      );
      clickedElement.classList.add("sc-current");

      // Trigger the menu item click handler
      handleMenuItemClick(e, index);
    },
    [selectedIndex, isLangArab, isExpanded, handleMenuItemClick]
  );

  useEffect(() => {
    if (selectedIndex === previousCount) {
      const selectedElement = menuItemsRef.current[selectedIndex];
      if (selectedElement) {
        const position = selectedElement.offsetLeft;
        setCurrentMenuPosition(position);
  
        const menuIndicator = document.querySelector(".sc-nav-indicator");
        if (menuIndicator) {
          menuIndicator.style.left = `${position}px`;
        }
  
        const menuBar = document.querySelector(".sc-bottom-bar");
        if (menuBar) {
          let size = position - 29; // Default size adjustment
  
          if (isExpanded) {
            switch (selectedIndex) {
              case 0:
                size = isLangArab ? position - 8 : position - 11;
                break;
              case 1:
                size = isLangArab ? position - 28 : position - 28;
                break;
              case 2:
                size = isLangArab ? position - 29 : position - 29;
                break;
              case 3:
                size = isLangArab ? position - 210 : position - 210;
                break;
              case 4:
              case 5:
              case 6:
                size = position - 29;
                break;
              default:
                break;
            }
          }
  
          menuBar.style.backgroundPosition = `${size}px`;
          menuBar.style.backgroundImage = document.body.classList.contains(
            "theme-dark"
          )
            ? "radial-gradient(circle at 38px 4px, transparent 28px, rgba(0, 0, 0, 0.2) 29px)"
            : isDarkMode
            ? "radial-gradient(circle at 38px 4px, transparent 28px, rgba(0, 0, 0, 0.2) 29px)"
            : "radial-gradient(circle at 38px 4px, transparent 28px, rgba(18, 69, 41, 0.2) 29px)";
        }
      }
    }
  }, [isLangArab, selectedIndex, isExpanded, isDarkMode]);
  

  useEffect(() => {
    if (resetTrigger) {
      setCurrentMenuPosition(0);
      setCurrentItemDisplay("none");
      setActiveMenuIndex(0);
      setIsExpanded(false);
      setSelectedIndex(null);
      console.log("Cancel Footer Clear Triggered Footer!")

      const menuBar = document.querySelector(isPlusShow ?".sc-Plus-bar":".sc-bottom-bar");
      if (menuBar) {
        menuBar.style.backgroundPosition = ``;
        menuBar.style.backgroundImage = document.body.classList.contains(
          "theme-dark"
        )
          ? ""
          : "";
      }

      menuItemsRef.current.forEach(
        (item) => item && item.classList.remove("sc-current")
      );

      const menuIndicator = document.querySelector(".sc-nav-indicator");
      if (menuIndicator) {
        menuIndicator.style.left = "0px";
      }
    }
  }, [resetTrigger]);

  return (
    <>
 <div
      className={`${ isPlusShow ? "sc-Plus-bar justify-center ":"sc-bottom-bar justify-between"} flex  items-center tab:h-[55px]  sm:h-[60px] h-[50px] ${
        isDarkMode ? !isPlusShow &&  "bg-[#152227CC]" : ""
      }  no-select ${
        isExpanded
          ? " tab:w-[350px] sm:w-[300px] w-[300px] "
          : " tab:w-[300px] sm:w-[300px] w-[300px]"
      }`}
    >
       { isPlusShow && <button
    onClick={()=> setisPlusShow(false)}
    className="w-12 h-12 sm:w-14 sm:h-14 relative text-white rounded-full flex items-center justify-center transition-colors duration-200"
  >
    <img
      src={isDarkMode ? HomeDark : Home}
      alt="Home Icon"
      className="w-10 h-10 sm:w-[70%] sm:h-[70%]"
    />
    <div className="absolute py-6 flex-1 justify-center items-center right-0">
      <img src={ShowPlus} alt="Home Sign" className="w-6 sm:w-[75%]" />
    </div>
  </button>}
    {!isPlusShow &&  <> {isLangArab
        ? Array.from({ length: 7 })
        .map((_, index) => 6 - index) // Reverse indices for Arabic
        .map((index) => (
              <React.Fragment key={index}>
                {( (index > 0) &&  (index < (isExpanded? 4 : 3))) &&   (
                  
                  <div
                    className={`sc-menu-wrp ${
                      selectedIndex === index ? "sc-current" : ""
                    }`}
                    ref={(el) => (menuItemsRef.current[index] = el)}
                    onClick={(e) => handleFooterItemClick(e, index, isExpanded)}
                    data-tooltip-id={`tooltip-${index}`}
                  >
                    <button
                      className="sc-menu-item"
                      data-tooltip-content={headingsMap[index]}
                      data-tooltip-id={`tooltip-${index}`}
                    >
                      <img
                        src={
                          isDarkMode
                            ? `${process.env.PUBLIC_URL}/Footer/dark/darkicon${
                                index + 1
                              }.svg`
                            : `${process.env.PUBLIC_URL}/Footer/icon${
                                index + 1
                              }.svg`
                        }
                        className="icon"
                        alt={`Icon ${index + 1}`}
                        style={{ width: "200px", height: "200px" }}
                      />
                      <ReactTooltip
                        id={`tooltip-${index}`}
                        
                        place="top"
                        className="ToolTipEnvi z-30"
                      />
                    </button>
                  </div>
                )}
                 {((index === 3) && RoleServices.isAuth() ) && (
                <div
                  className={`sc-menu-wrp ${isExpanded ? "hidden" : ""}`}
                  ref={(el) => (menuItemsRef.current[index] = el)}
                  onClick={(e) => handleFooterItemClick(e, index, isExpanded)}
                  data-tooltip-id={`tooltip-${index}`}
                  // onClickCapture={handleMouseEnter}
                >
                  <button
                    className="sc-menu-item bg-transparent border-4 w-12"
                    data-tooltip-content={headingsMap[index]}
                    data-tooltip-id={`tooltip-${index}`}
                  >
                    <img
                      src={
                        isDarkMode
                          ? `${process.env.PUBLIC_URL}/Footer/dark/darkicon${
                              index + 1
                            }.svg`
                          : `${process.env.PUBLIC_URL}/Footer/icon${
                              index + 1
                            }.svg`
                      }
                      className="icon"
                      alt={`Icon ${index + 1}`}
                      style={{ width: "200px", height: "200px" }}
                    />
                    <ReactTooltip
                      id={`tooltip-${index}`}
                      
                      place="top"
                      className="ToolTipEnvi z-30"
                    />
                  </button>
                </div>
              )}
                {index === 4 && (
                  <div
                    className={`sc-menu-wrp ${isExpanded ? "hidden" : ""}`}
                    ref={(el) => (menuItemsRef.current[index] = el)}
                    onClick={(e) => handleFooterItemClick(e, index, isExpanded)}
                    data-tooltip-id={`tooltip-${index}`}
                    // onClickCapture={handleMouseEnter}
                  >
                    <button
                      className="sc-menu-item bg-transparent border-4 w-12"
                      data-tooltip-content={headingsMap[index]}
                      data-tooltip-id={`tooltip-${index}`}
                    >
                      <img
                        src={
                          isDarkMode
                            ? `${process.env.PUBLIC_URL}/Footer/dark/darkicon${
                                index + 1
                              }.svg`
                            : `${process.env.PUBLIC_URL}/Footer/icon${
                                index + 1
                              }.svg`
                        }
                        className="icon"
                        alt={`Icon ${index + 1}`}
                        style={{ width: "200px", height: "200px" }}
                      />
                      <ReactTooltip
                        id={`tooltip-${index}`}
                        
                        place="top"
                        className="ToolTipEnvi z-30"
                      />
                    </button>
                  </div>
                )}
                {index > 4 && (
                  <div
                    className={`sc-menu-wrp ${
                      isExpanded ? "visible" : "hidden"
                    } ${selectedIndex === index ? "sc-current" : ""}`}
                    ref={(el) => (menuItemsRef.current[index] = el)}
                    onClick={(e) => handleFooterItemClick(e, index, isExpanded)}
                    data-tooltip-id={`tooltip-${index}`}
                  >
                    <button
                      className="sc-menu-item"
                      data-tooltip-content={headingsMap[index]}
                      data-tooltip-id={`tooltip-${index}`}
                    >
                      <img
                        src={
                          isDarkMode
                            ? `${process.env.PUBLIC_URL}/Footer/dark/darkicon${
                                index + 1
                              }.svg`
                            : `${process.env.PUBLIC_URL}/Footer/icon${
                                index + 1
                              }.svg`
                        }
                        className="icon"
                        alt={`Icon ${index + 1}`}
                        style={{ width: "200px", height: "200px" }}
                      />
                      <ReactTooltip
                        id={`tooltip-${index}`}
                        
                        place="top"
                        className="ToolTipEnvi z-30"
                      />
                    </button>
                  </div>
                )}
              </React.Fragment>
            ))
        : Array.from({ length: 7 }).map((_, index) => (
            <React.Fragment key={index}>
              {( (index > 0) &&  (index <  (isExpanded? 4 : 3))) && (
                <div
                  className={`sc-menu-wrp ${
                    selectedIndex === index ? "sc-current" : ""
                  }`}
                  ref={(el) => (menuItemsRef.current[index] = el)}
                  onClick={(e) => handleFooterItemClick(e, index, isExpanded)}
                  data-tooltip-id={`tooltip-${index}`}
                >
                  <button
                    className="sc-menu-item"
                    data-tooltip-content={headingsMap[index]}
                    data-tooltip-id={`tooltip-${index}`}
                  >
                    <img
                      src={
                        isDarkMode
                          ? `${process.env.PUBLIC_URL}/Footer/dark/darkicon${
                              index + 1
                            }.svg`
                          : `${process.env.PUBLIC_URL}/Footer/icon${
                              index + 1
                            }.svg`
                      }
                      className="icon"
                      alt={`Icon ${index + 1}`}
                      style={{ width: "200px", height: "200px" }}
                    />
                    <ReactTooltip
                      id={`tooltip-${index}`}
                      
                      place="top"
                      className="ToolTipEnvi z-30"
                    />
                  </button>
                </div>
              )}
               {((index === 3) && RoleServices.isAuth() ) && (
                <div
                  className={`sc-menu-wrp ${isExpanded ? "hidden" : ""}`}
                  ref={(el) => (menuItemsRef.current[index] = el)}
                  onClick={(e) => handleFooterItemClick(e, index, isExpanded)}
                  data-tooltip-id={`tooltip-${index}`}
                  // onClickCapture={handleMouseEnter}
                >
                  <button
                    className="sc-menu-item bg-transparent border-4 w-12"
                    data-tooltip-content={headingsMap[index]}
                    data-tooltip-id={`tooltip-${index}`}
                  >
                    <img
                      src={
                        isDarkMode
                          ? `${process.env.PUBLIC_URL}/Footer/dark/darkicon${
                              index + 1
                            }.svg`
                          : `${process.env.PUBLIC_URL}/Footer/icon${
                              index + 1
                            }.svg`
                      }
                      className="icon"
                      alt={`Icon ${index + 1}`}
                      style={{ width: "200px", height: "200px" }}
                    />
                    <ReactTooltip
                      id={`tooltip-${index}`}
                      
                      place="top"
                      className="ToolTipEnvi z-30"
                    />
                  </button>
                </div>
              )}
              {index === 4 && (
                <div
                  className={`sc-menu-wrp ${isExpanded ? "hidden" : ""}`}
                  ref={(el) => (menuItemsRef.current[index] = el)}
                  onClick={(e) => handleFooterItemClick(e, index, isExpanded)}
                  data-tooltip-id={`tooltip-${index}`}
                  // onClickCapture={handleMouseEnter}
                >
                  <button
                    className="sc-menu-item bg-transparent border-4 w-12"
                    data-tooltip-content={headingsMap[index]}
                    data-tooltip-id={`tooltip-${index}`}
                  >
                    <img
                      src={
                        isDarkMode
                          ? `${process.env.PUBLIC_URL}/Footer/dark/darkicon${
                              index + 1
                            }.svg`
                          : `${process.env.PUBLIC_URL}/Footer/icon${
                              index + 1
                            }.svg`
                      }
                      className="icon"
                      alt={`Icon ${index + 1}`}
                      style={{ width: "200px", height: "200px" }}
                    />
                    <ReactTooltip
                      id={`tooltip-${index}`}
                      
                      place="top"
                      className="ToolTipEnvi z-30"
                    />
                  </button>
                </div>
              )}
              {index > 4 && (
                <div
                  className={`sc-menu-wrp ${
                    isExpanded ? "visible" : "hidden"
                  } ${selectedIndex === index ? "sc-current" : ""}`}
                  ref={(el) => (menuItemsRef.current[index] = el)}
                  onClick={(e) => handleFooterItemClick(e, index, isExpanded)}
                  data-tooltip-id={`tooltip-${index}`}
                >
                  <button
                    className="sc-menu-item"
                    data-tooltip-content={headingsMap[index]}
                    data-tooltip-id={`tooltip-${index}`}
                  >
                    <img
                      src={
                        isDarkMode
                          ? `${process.env.PUBLIC_URL}/Footer/dark/darkicon${
                              index + 1
                            }.svg`
                          : `${process.env.PUBLIC_URL}/Footer/icon${
                              index + 1
                            }.svg`
                      }
                      className="icon"
                      alt={`Icon ${index + 1}`}
                      style={{ width: "200px", height: "200px" }}
                    />
                    <ReactTooltip
                      id={`tooltip-${index}`}
                      
                      place="top"
                      className="ToolTipEnvi z-30"
                    />
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
      <button
        ref={navIndicatorRef}
        className="sc-nav-indicator z-10"
        style={{
          bottom: `${currentMenuPosition}px`,
          display: currentItemDisplay,
        }}
      />
      </>}
    </div>
    </>
  );
}

Footer.propTypes = {
  handleMenuItemClick: PropTypes.func.isRequired,
  resetTrigger: PropTypes.bool.isRequired,
};
