import React, { useState } from 'react';
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';

interface YoutubePlayerProps {
  youtubeUrl: string;
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ youtubeUrl }) => {
  // State to manage whether the music is playing
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Extract the video ID from the YouTube URL
  const videoId = new URL(youtubeUrl).searchParams.get('v');

  return (
    <div className="music-player rounded-lg">
      {videoId ? <YouTube videoId={videoId} opts={{ width: '100%' }} /> : null}
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      {isPlaying && (
        <ReactPlayer
          url={youtubeUrl}
          playing={true}
          controls={true}
          width="100"
          height="50" // Adjust the height as needed
        />
      )}
    </div>
  );
};

export default YoutubePlayer;
