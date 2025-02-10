"use client";
import React from "react";
import Row from "./Row";
import Column from "./Columns";
import TextBlock from "./TextBlock";
import Button from "./Button";
import SingleImage from "./SingleImage";
import Video from "./Video";
import AccordionComponent from "./Accordion";

const WPBakeryRenderer = ({ content }) => {
  const renderContent = (item) => {
    switch (item.type) {
      case "vc_row":
      case "vc_row_inner":
        return <Row item={item} renderContent={renderContent} />;

      case "vc_column":
      case "vc_column_inner":
        return <Column item={item} renderContent={renderContent} />;

      case "vc_column_text":
        return <TextBlock item={item} />;

      case "vc_btn":
        return <Button item={item} />;

      case "vc_single_image":
        return <SingleImage item={item} />;

      case "vc_video":
        return <Video item={item} />;

      case "vc_tta_accordion":
        return <AccordionComponent item={item} renderContent={renderContent} />;

      default:
        console.warn(`Unhandled element type: ${item.type}`);
        return <div>Unknown element type: {item.type}</div>;
    }
  };

  return (
    <div className="wpbakery-content">
      {Array.isArray(content) &&
        content.map((item, index) => (
          <React.Fragment key={index}>{renderContent(item)}</React.Fragment>
        ))}
    </div>
  );
};

export default WPBakeryRenderer;
