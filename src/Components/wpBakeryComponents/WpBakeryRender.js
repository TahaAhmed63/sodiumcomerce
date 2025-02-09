import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
// import Product from "../HomeProducts/HomeProduct";
import { Accordion } from "react-bootstrap";
import FeaturedCollection from "../homeComponents/FeaturedCollection";
import Catagories from "../homeComponents/Catagories";

const WPBakeryRenderer = ({ content }) => {
  // Function to handle rendering individual components
  const renderContent = (item) => {
    switch (item.type) {
      case "vc_row":
      case "vc_row_inner":
        return renderRow(item);

      case "vc_column":
      case "vc_column_inner":
        return renderColumn(item);

        case "vc_column_text":
          return (
            <>
              {/* Render the Product component if el_id exists */}
              {item?.attributes?.el_id==="featured-product" && <FeaturedCollection />}
              {item?.attributes?.el_id==="featured-catagories" && <Catagories />}
              {/* Render the column text content */}
              <div
                dangerouslySetInnerHTML={{ __html: item.content }}
                className={item?.attributes?.el_class || ""}
              />
            </>
          );
      case "vc_single_image":
        return renderSingleImage(item);

        case "vc_btn":
            const parseLink = (link) => {
                if (!link) return { url: "#", target: "_self" };
              
                const [urlPart, targetPart] = link.split("|");
                const url = urlPart.replace("url:", "").trim();
                const target = targetPart?.replace("target:", "").trim() || "_self";
              
                return { url: decodeURIComponent(url), target };
              };
              
            const { custom_background, custom_text, css, shape, title, link,color } =
              item?.attributes || {};
            const { url, target } = parseLink(link);
            const buttonStyles = {
              backgroundColor: custom_background ? custom_background : color,
              color: custom_text,
              ...parseStyles(css),
            };
          
            return (
              <Link
                href={url || "#"}
                target={target}
                className={`btn ${shape === "square" ? "rounded-0 mx-2 mt-3" : "rounded-1"} ${
                  item?.attributes?.el_class || ""
                }`}
                style={buttonStyles}
              >
                {title}
              </Link>
            );
      
          case "vc_raw_html":
            return (
              <div
                dangerouslySetInnerHTML={{
                  __html: atob(item.content || ""),
                }}
              />
            );
            case "vc_video":
  return renderVideo(item);
  case "vc_tta_accordion":
    return renderAccordion(item);
  
      // Add other cases here as needed
      default:
        console.warn(`Unhandled element type: ${item.type}`);
        return <div>Unknown element type: {item.type}</div>;
    }
  };
  const renderVideo = (item) => {
    const { link, css, el_class } = item?.attributes || {};
    if (!link) return null; // If no link is provided, return null
  
    // Extract YouTube or Vimeo video ID
    const isYouTube = link.includes("youtube.com") || link.includes("youtu.be");
    const isVimeo = link.includes("vimeo.com");
  
    let embedUrl = "";
    if (isYouTube) {
      const videoId = link.split("v=")[1]?.split("&")[0] || link.split("/").pop();
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (isVimeo) {
      const videoId = link.split("/").pop();
      embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }
  
    if (!embedUrl) return <div>Invalid video URL</div>;
  
    return (
      <div className={`video-container ${el_class || ""}`} style={parseStyles(css)}>
        <iframe
          width="100%"
          height="400"
          src={embedUrl}
          title="Embedded Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };
  const renderAccordion = (item) => {
    const accordionId = `accordion-${Math.random().toString(36).substr(2, 9)}`;
  
    return (
      <Accordion defaultActiveKey="0" className="my-3">
      {item.content.map((section, index) => renderAccordionSection(section, index))}
    </Accordion>
    );
  };
  
  const renderAccordionSection = (section, index) => {
    return (
      <Accordion.Item eventKey={index.toString()} key={section.attributes.tab_id}>
        <Accordion.Header>{section.attributes.title}</Accordion.Header>
        <Accordion.Body>
          {Array.isArray(section.content) &&
            section.content.map((child, i) => (
              <React.Fragment key={i}>{renderContent(child)}</React.Fragment>
            ))}
        </Accordion.Body>
      </Accordion.Item>
    );
  };
  
  // Render logic for "vc_row" and "vc_row_inner"
  const renderRow = (item) => {
    const { full_width, rtl_reverse, content_placement, el_class,css } =
      item?.attributes || {};
    const rowRef = useRef(null);
    const [rowStyles, setRowStyles] = useState({});

    const calculateRowStyles = () => {
      if (
        full_width === "stretch_row_content" ||
        full_width === "stretch_row_content_no_spaces"
      ) {
        const parentWidth = rowRef.current?.parentNode.offsetWidth || 0;
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
          const cssSplit = cssString.split("{");
          if (cssSplit[1]) {
            const inlineStyles = cssSplit[1].replace("}", "").trim();
            inlineStyles.split(";").forEach((style) => {
              const [property, value] = style.split(":");
              if (property && value) {
                const sanitizedValue = value.trim().replace(/https?:\/\/[^\s]+/g, (match) => match.trim()); // Ensure the URL is properly formatted
                styles[property.trim()] = sanitizedValue;
              }
            });
          }
        }
        return styles;
      };
      useEffect(() => {
        // Set initial row styles and add a resize listener
        setRowStyles({ ...calculateRowStyles(), ...parseInlineStyles(css) });
    
        const handleResize = () => {
          setRowStyles({ ...calculateRowStyles(), ...parseInlineStyles(css) });
        };
    
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, [full_width, css]);
    
      // Dynamically calculate classes
      const containerClasses = classNames("row", el_class, {
        "rtl-reverse": rtl_reverse === "yes",
        "align-middle": content_placement === "middle",
        "align-top": content_placement === "top",
        "align-bottom": content_placement === "bottom",
      });
      
      return (
      <div className={containerClasses + " my-4" } style={rowStyles} ref={rowRef}>
        {Array.isArray(item.content) &&
          item.content.map((child, index) => (
            <React.Fragment key={index} >{renderContent(child)}</React.Fragment>
          ))}
      </div>
    );
  };

  // Render logic for "vc_column" and "vc_column_inner"
  const renderColumn = (item) => {
    const cleanClass = item.attributes?.offset
      ? item.attributes.offset.replace(/vc_/g, "")
      : "";
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
      <div
      className={`${widthClass} ${
        item.type === "vc_column_inner" ? "col-inner" : ""
      } ${cleanClass} ${item.attributes.el_class || ""}`}
      style={parseStyles(item.attributes?.css)}
      >
        {Array.isArray(item.content) &&
          item.content.map((child, index) => (
            <React.Fragment key={index}>{renderContent(child)}</React.Fragment>
          ))}
      </div>
    );
  };

  // Render logic for "vc_single_image"
  const renderSingleImage = (item) => (
    <div className={item?.attributes?.el_class || ""}>
      <img
        src={item?.attributes?.image_url || ""}
        className={item?.attributes?.el_class || ""}
        alt={item?.attributes?.alt || "Image"}
      />
    </div>
  );

  // Helper function to parse inline CSS
  const parseStyles = (css) => {
    const styles = {};
    if (css) {
      css.split(";").forEach((style) => {
        const [property, value] = style.split(":");
        if (property && value) {
          styles[property.trim()] = value.trim();
        } else {
          console.warn("Invalid CSS style:", style);
        }
      });
    }
    return styles;
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
