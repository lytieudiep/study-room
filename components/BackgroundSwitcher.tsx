// components/BackgroundSwitcher.tsx
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image'


interface BackgroundSwitcherProps {
  onImageChange: (imageUrl: string) => void;
  imageLibrary: string[]
}

const BackgroundSwitcher = ({ onImageChange, imageLibrary }: BackgroundSwitcherProps) => {

  const handleImageChange = (imageUrl: string) => {
    onImageChange(imageUrl);
  };

  return (

    <div className="items-center ">
      <div className=""
        style={{
          flex: 1, // Occupy the remaining space
        }}>
        <Carousel
          showArrows={true}
          showThumbs={false}
          onChange={(index, _) => handleImageChange(imageLibrary[index])}
        >
          {imageLibrary.map((imageUrl, index) => (
            <div key={index}>
              <img style={{
                height: "50px",
                width: "80px",
              }} src={imageUrl} alt={`Image ${index}`} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default BackgroundSwitcher;
