import React from "react";

const Video = ({ item }) => {
  const { link } = item?.attributes || {};
  if (!link) return null;

  const videoId = link.split("v=")[1]?.split("&")[0] || link.split("/").pop();
  const embedUrl = link.includes("youtube") 
    ? `https://www.youtube.com/embed/${videoId}` 
    : `https://player.vimeo.com/video/${videoId}`;

  return (
    <div className="video-container">
      <iframe width="100%" height="400" src={embedUrl} allowFullScreen />
    </div>
  );
};

export default Video;
