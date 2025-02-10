import React from "react";

const SingleImage = ({ item }) => (
  <div className={item?.attributes?.el_class || ""}>
    <img
      src={item?.attributes?.image_url || ""}
      className={item?.attributes?.el_class || ""}
      alt={item?.attributes?.alt || "Image"}
    />
  </div>
);

export default SingleImage;
