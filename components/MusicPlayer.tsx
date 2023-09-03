
"use client"; 
import React, { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';

interface YouTubePlayerProps {
  videoUrl: string;
}

const MusicPlayer: React.FC<YouTubePlayerProps> = ({ videoUrl }) => {
  const opts = {
    height: '190',
    width: '340',
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event: { target: any }) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  };

  return (
    <div className="w-full">
      <YouTube videoId={videoUrl} opts={opts} onReady={onReady} />
    </div>
  );
};

export default MusicPlayer;







