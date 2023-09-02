// components/Background.tsx
import { ReactNode } from 'react';

interface BackgroundProps {
  imageUrl: string;
  children: ReactNode;
}

const Background = ({ imageUrl, children }: BackgroundProps) => {
  return (
    <div
      className="flex items-center justify-center min-h-full- min-w-full"
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
