// components/Background.tsx
import { ReactNode } from 'react';
import styles from "./Background.module.css";

interface BackgroundProps {
  imageUrl: string;
  children: ReactNode;
}

const Background = ({ imageUrl, children }: BackgroundProps) => {
  return (
    <>

      <div className={styles.video_background}>
        <video autoPlay={true} muted={true} loop={true} id="bgVideo">
          <source src={imageUrl} type="video/webm" >
          </source>
        </video>
        <div className="content">
          {children}
        </div>
      </div>

      {/* //  <div
    //   className="min-h-screen bg-cover bg-center"
    //   style={{
    //     backgroundImage: `url(${imageUrl})`,
    //     backgroundSize: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    //     backgroundPosition: 'center'
        

    //   }}
    // >
    //   {children}
    // </div> 
  ); */}
    </>
  );
};

export default Background;
