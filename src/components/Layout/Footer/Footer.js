import React, { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip as ReactTooltip } from "react-tooltip";
import PropTypes from "prop-types";
import "./Footer.css";
import { useTheme } from "../../Layout/ThemeContext/ThemeContext"; // Import the theme context
import usePrevious from "../../../Providers/Hooks/usePrevious"; // Adjust the path
import "react-tooltip/dist/react-tooltip.css";

export default function Footer({
  handleClose,
  handleMenuItemClick,
  setPopup,
  resetTrigger,
}) {
  const [currentMenuPosition, setCurrentMenuPosition] = useState(0);
  const [currentItemDisplay, setCurrentItemDisplay] = useState("none");
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
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
    2: t(isLangArab ? "القياس" : "Measurment"),
    3: t(isLangArab ? "دبوس مُنقَطِع" : "Dropped Pin"),
    4: t(isLangArab ? "مشاركة" : "Share"),
    5: t(isLangArab ? "تصدير البيانات" : "Export Data"),
    6: t(isLangArab ? "طباعة البيانات" : "Print Data"),
  };

  // const handleFooterItemClick = useCallback(
  //   (e, index, isExpanded) => {
  //     e.preventDefault();
  //     if(previousCount === null) setSelectedIndex(index);
  //     if (  index === previousCount) return ;
  //     console.log("Current footer index:", index);
  //     if (index <= 4) {
  //       setIsExpanded(false);
  //     }

  //     if (index >= 4) {
  //       if (index === 4) {
  //         setCurrentMenuPosition(0);
  //         setCurrentItemDisplay("none");
  //         setActiveMenuIndex(0);
  //         setSelectedIndex(null);
  //         setPopup(null);
  //         setIsExpanded(true);

  //         const menuBar = document.querySelector(".sc-bottom-bar");
  //         if (menuBar) {
  //           menuBar.style.backgroundPosition = ``;
  //           menuBar.style.backgroundImage = document.body.classList.contains(
  //             "theme-dark"
  //           )
  //             ? ""
  //             : "";
  //         }

  //         menuItemsRef.current.forEach(
  //           (item) => item && item.classList.remove("sc-current")
  //         );

  //         const menuIndicator = document.querySelector(".sc-nav-indicator");
  //         if (menuIndicator) {
  //           menuIndicator.style.left = "0px";
  //         }
  //       }
  //     }

  //     if (index < 4 || index === 5 || index === 6) {
  //       const clickedElement = e.currentTarget;
  //       const position = clickedElement.offsetLeft;
  //       setCurrentMenuPosition(position);
  //       setCurrentItemDisplay("block");

  //       const menuIndicator = document.querySelector(".sc-nav-indicator");
  //       if (menuIndicator) {
  //         menuIndicator.style.left = `${position}px`;
  //       }

  //       const menuBar = document.querySelector(".sc-bottom-bar");
  //       if (menuBar) {
  //         let size = position - 11; // Default size assignment

  //         // Check if the menu is expanded and set the position based on index and language
  //         if (isExpanded) {
  //           switch (index) {
  //             case 0:
  //               size = isLangArab ? position - 60 : position - 11;
  //               break;
  //             case 1:
  //               size = isLangArab ? position - 65 : position - 7;
  //               break;
  //             case 2:
  //               size = isLangArab ? position - 70 : position - 3;
  //               break;
  //             case 3:
  //               size = isLangArab ? position - 75 : position + 3;
  //               break;
  //             case 4:
  //             case 5:
  //             case 6:
  //               size = position - 11; // Same for indexes 4, 5, and 6
  //               break;
  //             default:
  //               break;
  //           }
  //         }

  //         // Apply the calculated size to the menuBar's background position
  //         menuBar.style.backgroundPosition = `${size}px`;
  //         menuBar.style.backgroundImage = document.body.classList.contains(
  //           "theme-dark"
  //         )
  //           ? "radial-gradient(circle at 38px 4px, transparent 28px, rgba(0, 0, 0, 0.2) 29px)"
  //           : "radial-gradient(circle at 38px 4px, transparent 28px, rgba(18, 69, 41, 0.2) 29px)";
  //       }

  //       setActiveMenuIndex(index);
  //       setSelectedIndex(index);
  //       menuItemsRef.current.forEach(
  //         (item) => item && item.classList.remove("sc-current")
  //       );
  //       clickedElement.classList.add("sc-current");
  //     }

  //     if (index !== 4) {
  //       handleMenuItemClick(e, index);
  //     }
  //   },
  //   [handleMenuItemClick]
  // );

  const handleFooterItemClick = useCallback(
    (e, index) => {
      e.preventDefault();

      // Prevent recalculation when clicking the same index consecutively
      if (index === selectedIndex) return;

      console.log("Current footer index:", index);

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
              size = isLangArab ? position - 60 : position - 11;
              break;
            case 1:
              size = isLangArab ? position - 65 : position - 7;
              break;
            case 2:
              size = isLangArab ? position - 70 : position - 3;
              break;
            case 3:
              size = isLangArab ? position - 75 : position + 3;
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

        menuBar.style.backgroundPosition = `${size}px`;
        menuBar.style.backgroundImage = document.body.classList.contains(
          "theme-dark"
        )
          ? "radial-gradient(circle at 38px 4px, transparent 28px, rgba(0, 0, 0, 0.2) 29px)"
          : "radial-gradient(circle at 38px 4px, transparent 28px, rgba(18, 69, 41, 0.2) 29px)";
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
    if (resetTrigger) {
      setCurrentMenuPosition(0);
      setCurrentItemDisplay("none");
      setActiveMenuIndex(0);
      setIsExpanded(false);
      setSelectedIndex(null);

      const menuBar = document.querySelector(".sc-bottom-bar");
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
    <div
      className={`sc-bottom-bar flex justify-between items-center tab:h-[55px]  sm:h-[60px] h-[50px] ${
        isDarkMode ? "bg-[#152227CC]" : ""
      }  no-select ${
        isExpanded
          ? " tab:w-[350px] sm:w-[300px] w-[300px] "
          : " tab:w-[300px] sm:w-[300px] w-[300px]"
      }`}
    >
      {isLangArab
        ? Array.from({ length: 7 })
            .map((_, index) => index) // Create an array of indices
            .reverse() // Reverse the order
            .map((index) => (
              <React.Fragment key={index}>
                {index < 4 && (
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
                        content="This is a tooltip"
                        place="top"
                        className="ToolTipEnvi"
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
                        content="This is a tooltip"
                        place="top"
                        className="ToolTipEnvi"
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
                        content="This is a tooltip"
                        place="top"
                        className="ToolTipEnvi"
                      />
                    </button>
                  </div>
                )}
              </React.Fragment>
            ))
        : Array.from({ length: 7 }).map((_, index) => (
            <React.Fragment key={index}>
              {index < 4 && (
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
                      content="This is a tooltip"
                      place="top"
                      className="ToolTipEnvi"
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
                      content="This is a tooltip"
                      place="top"
                      className="ToolTipEnvi"
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
                      content="This is a tooltip"
                      place="top"
                      className="ToolTipEnvi"
                    />
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
      <button
        ref={navIndicatorRef}
        className="sc-nav-indicator"
        style={{
          bottom: `${currentMenuPosition}px`,
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
