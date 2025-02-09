import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

const Row = ({ type, attributes, children }) => {
  if (type !== "vc_row") return null;

  const {
    full_width,
    rtl_reverse,
    content_placement,
    el_class
  } = attributes || {};

  const rowRef = useRef(null);
  const [rowStyles, setRowStyles] = useState({});

  useEffect(() => {
    if (full_width === "stretch_row_content" || full_width === "stretch_row_content_no_spaces") {
      const parentWidth = rowRef.current?.parentNode.offsetWidth || 0;
      const windowWidth = window.innerWidth;

      // Calculate the left offset and stretched width
      const leftOffset = (windowWidth - parentWidth) / -2;
      const stretchedWidth = windowWidth;

      setRowStyles({
        position: 'relative',
        left: `${leftOffset}px`,
        width: `${stretchedWidth}px`,
        maxWidth: `${stretchedWidth}px`,
        boxSizing: 'border-box',
        margin: full_width === "stretch_row_content_no_spaces" ? '0' : undefined,
        padding: full_width === "stretch_row_content_no_spaces" ? '0' : undefined,
      });
    }
  }, [full_width]);

  const containerClasses = classNames('row', el_class, {
    'rtl-reverse': rtl_reverse === 'yes',
    'align-middle': content_placement === 'middle',
    'align-top': content_placement === 'top',
    'align-bottom': content_placement === 'bottom',
  });

  return (
    <div ref={rowRef} className={containerClasses} style={rowStyles}>
  {Array.isArray(children.content) && 
              item.content.map((child, index) => (
                <React.Fragment key={index}>{renderContent(child)}</React.Fragment>
              ))}
    </div>
  );
};

export default Row;
