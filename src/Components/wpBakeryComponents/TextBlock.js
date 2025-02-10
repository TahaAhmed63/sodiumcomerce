import React from "react";
import FeaturedCollection from "../homeComponents/FeaturedCollection";
import Catagories from "../homeComponents/Catagories";

const TextBlock = ({ item }) => {
  return (
    <>
      {item?.attributes?.el_id === "featured-product" && <FeaturedCollection />}
      {item?.attributes?.el_id === "featured-catagories" && <Catagories />}
      <div
        dangerouslySetInnerHTML={{ __html: item.content }}
        className={item?.attributes?.el_class || ""}
      />
    </>
  );
};

export default TextBlock;
