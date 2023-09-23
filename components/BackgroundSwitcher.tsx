// components/BackgroundSwitcher.tsx
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image'



interface BackgroundSwitcherProps {
  onVideoChange: (videoUrl: string) => void;
  videoLibrary: string[];
}

const BackgroundSwitcher: React.FC<BackgroundSwitcherProps> = ({
  onVideoChange,
  videoLibrary,
}) => {
  const handleVideoChange = (videoUrl: string) => {
    onVideoChange(videoUrl);
  };

  return (
    <div className="flex justify-center items-center mb-4 space-x-2">
      <div style={{ flex: 1 }}>
        <Carousel
          showArrows={true}
          showThumbs={false}
          onChange={(index, _) => handleVideoChange(videoLibrary[index])}
        >
          {videoLibrary.map((videoUrl, index) => (
            <div key={index}>
              <video
                style={{
                  height: '50px', // Adjust the size as needed
                  width: '50px', // Adjust the size as needed
                }}
                autoPlay
                loop
                muted
                controls={false} // Hide controls if not needed
              >
                <source src={videoUrl} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default BackgroundSwitcher;


