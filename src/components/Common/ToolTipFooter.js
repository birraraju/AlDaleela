import React, { useState, useRef } from "react";

const Tooltip = ({
  id,
  content,
  place = "top",
  className = "",
  style = {},
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseEnter = () => {
    const rect = ref.current.getBoundingClientRect();
    let x = rect.left + rect.width / 2;
    let y = rect.top;

    if (place === "bottom") y = rect.bottom;
    if (place === "left") x = rect.left;
    if (place === "right") x = rect.right;

    setTooltipPosition({ x, y });
    setVisible(true);
  };

  const handleMouseLeave = () => setVisible(false);

  return (
    <div
      id={id}
      ref={ref}
      className={className}
      style={{ display: "inline-block", position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {visible && (
        <div
          style={{
            position: "fixed",
            top: `${tooltipPosition.y + (place === "bottom" ? 10 : -30)}px`,
            left: `${tooltipPosition.x}px`,
            transform: "translateX(-50%)",
            backgroundColor: "black",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 1000,
            ...style,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
