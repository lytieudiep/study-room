// components/Background.tsx
import { ReactNode } from 'react';
import styles from "./Background.module.css";

interface BackgroundProps {
  videoUrl: string; // Change to videoUrl to match the prop being used
  children: ReactNode;
}

const Video = ({ videoUrl }: { videoUrl: string }) => {
  return <video src={videoUrl} autoPlay={true} muted={true} loop={true} id="bgVideo">

  </video>
}

const Background = ({ videoUrl, children }: BackgroundProps) => {
  return (
    <>
      <div className={styles.video_background}>
        <Video videoUrl={videoUrl} />
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
