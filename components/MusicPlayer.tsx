
"use client"; 

import { useState } from 'react';
import YouTube from 'react-youtube';

interface MusicPlayerProps {
  videoId: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const onPlayerReady = (event: any) => {
    event.target.pauseVideo(); // Pause the video initially
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative">
      <YouTube
        videoId={videoId}
        opts={{
          playerVars: {
            autoplay: isPlaying ? 1 : 0,
          },
        }}
        onReady={onPlayerReady}
        className="w-full h-0"
      />
      <button
        className="btn absolute bottom-4 right-4"
        onClick={togglePlay}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default MusicPlayer;
