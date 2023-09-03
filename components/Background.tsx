// components/Background.tsx
import { ReactNode } from 'react';

interface BackgroundProps {
  imageUrl: string;
  children: ReactNode;
}

const Background = ({ imageUrl, children }: BackgroundProps) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default Background;
