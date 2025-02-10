import React from "react";
import Link from "next/link";

const Button = ({ item }) => {
  const parseLink = (link) => {
    if (!link) return { url: "#", target: "_self" };
    const [urlPart, targetPart] = link.split("|");
    return {
      url: decodeURIComponent(urlPart.replace("url:", "").trim()),
      target: targetPart?.replace("target:", "").trim() || "_self",
    };
  };

  const { url, target } = parseLink(item?.attributes?.link);
  return (
    <Link href={url} target={target} className="btn">
      {item.attributes.title}
    </Link>
  );
};

export default Button;
