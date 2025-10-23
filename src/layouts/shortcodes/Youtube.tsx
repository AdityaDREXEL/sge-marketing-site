import React from "react";
import * as YouTubeEmbed from 'react-lite-youtube-embed';
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const LiteYouTubeEmbed = YouTubeEmbed.default; // Explicitly access the default export if it exists this way
const Youtube = ({
  id,
  title,
  ...rest
}: {
  id: string;
  title: string;
  [key: string]: any;
}) => {
  return (
    <LiteYouTubeEmbed
      wrapperClass="yt-lite rounded-lg"
      id={id}
      title={title}
      {...rest}
    />
  );
};

export default Youtube;
