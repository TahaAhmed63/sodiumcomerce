import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

const VCRow = ({ item, renderContent }) => {
  const {
    full_width,
    rtl_reverse,
    content_placement,
    el_class,
  } = item?.attributes || {};

  const rowRef = useRef(null);
  const [rowStyles, setRowStyles] = useState({});

  const calculateRowStyles = () => {
    if (
      full_width === "stretch_row_content" ||
      full_width === "stretch_row_content_no_spaces"
    ) {
      const parentWidth = rowRef.current?.parentNode.offsetWidth || 0;
      const windowWidth = window.innerWidth;

      // Calculate the left offset and stretched width
      const leftOffset = (windowWidth - parentWidth) / -2;
      const stretchedWidth = windowWidth;

      return {
        position: "relative",
        left: `${leftOffset}px`,
        width: `${stretchedWidth}px`,
        maxWidth: `${stretchedWidth}px`,
        boxSizing: "border-box",
        margin: full_width === "stretch_row_content_no_spaces" ? "0" : undefined,
        padding: full_width === "stretch_row_content_no_spaces" ? "0" : undefined,
      };
    }

    return {}; // Return empty styles for non-stretching rows
  };

  useEffect(() => {
    // Initial calculation of row styles
    setRowStyles(calculateRowStyles());

    // Add an event listener for window resizing
    const handleResize = () => {
      setRowStyles(calculateRowStyles());
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [full_width]); // Recalculate styles if full_width changes

  const containerClasses = classNames("row", el_class, {
    "rtl-reverse": rtl_reverse === "yes",
    "align-middle": content_placement === "middle",
    "align-top": content_placement === "top",
    "align-bottom": content_placement === "bottom",
  });

  return (
    <div className={containerClasses} style={rowStyles} ref={rowRef}>
      {Array.isArray(item.content) &&
        item.content.map((child, index) => (
          <React.Fragment key={index}>{renderContent(child)}</React.Fragment>
        ))}
    </div>
  );
};

export default VCRow;
