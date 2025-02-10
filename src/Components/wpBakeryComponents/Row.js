import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames";

const Row = ({ item, renderContent }) => {
  const { full_width, rtl_reverse, content_placement, el_class, css } =
    item?.attributes || {};
  const rowRef = useRef(null);
  const [rowStyles, setRowStyles] = useState({});

  const calculateRowStyles = () => {
    if (
      full_width === "stretch_row_content" ||
      full_width === "stretch_row_content_no_spaces"
    ) {
      const parentWidth = rowRef.current?.parentNode?.offsetWidth || 0;
      const windowWidth = window.innerWidth;
      const leftOffset = (windowWidth - parentWidth) / -2;
      return {
        position: "relative",
        left: `${leftOffset}px`,
        width: `${windowWidth}px`,
        maxWidth: `${windowWidth}px`,
        boxSizing: "border-box",
        margin: full_width === "stretch_row_content_no_spaces" ? "0" : undefined,
        padding: full_width === "stretch_row_content_no_spaces" ? "0" : undefined,
      };
    }
    return {};
  };

  const parseInlineStyles = (cssString) => {
    const styles = {};
    if (cssString) {
      const match = cssString.match(/\{([^}]+)\}/);
      if (match) {
        match[1].split(";").forEach((style) => {
          let [property, value] = style.split(":");
          if (property && value) {
            property = property.trim();
            value = value.trim().replace(/https?:\/\/[^\s]+/g, (match) => match.trim());
            styles[property] = value;
          }
        });
      }
    }
    return styles;
  };

  useEffect(() => {
    const updateStyles = () => {
      setRowStyles({ ...calculateRowStyles(), ...parseInlineStyles(css) });
    };

    updateStyles(); // Initialize styles on mount

    window.addEventListener("resize", updateStyles);
    return () => window.removeEventListener("resize", updateStyles);
  }, [full_width, css]);

  const containerClasses = classNames(
    "row",
    el_class,
    "my-4",
    {
      "rtl-reverse": rtl_reverse === "yes",
      "align-middle": content_placement === "middle",
      "align-top": content_placement === "top",
      "align-bottom": content_placement === "bottom",
    }
  );

  return (
    <div className={containerClasses} style={rowStyles} ref={rowRef}>
      {Array.isArray(item.content) &&
        item.content.map((child, index) => (
          <React.Fragment key={index}>{renderContent(child)}</React.Fragment>
        ))}
    </div>
  );
};

export default Row;
