import React from "react";

const Column = ({ item, renderContent }) => {
  const widthMap = {
    "1/1": "col-lg-12",
        "1/2": "col-lg-6",
        "1/3": "col-lg-4",
        "2/3": "col-lg-8",
        "1/4": "col-lg-3",
        "3/4": "col-lg-9",
        "1/5": "col-lg-2",
        "2/5": "col-lg-5",
        "3/5": "col-lg-7",
        "4/5": "col-lg-10",
        "1/6": "col-lg-2",
        "5/6": "col-lg-10"
  };

  const widthClass = widthMap[item.attributes?.width] || "";

  return (
    <div className={`${widthClass} ${item.attributes?.el_class || ""}`}>
      {Array.isArray(item.content) &&
        item.content.map((child, index) => (
          <React.Fragment key={index}>{renderContent(child)}</React.Fragment>
        ))}
    </div>
  );
};

export default Column;
