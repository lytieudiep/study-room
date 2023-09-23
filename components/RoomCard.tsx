// SpaceCard.js
import { RoomTruncated } from '@/entities/rooms';
import React from 'react';

const RoomCard = ({ room, index }: { room: RoomTruncated, index: number }) => {
  const backgroundImages = ['/thumbnail1.png', '/thumbnail2.png', '/thumbnail3.png'];
  const selectedBackgroundImage = backgroundImages[index % 3];


  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src={selectedBackgroundImage} alt="image" /></figure>
      <div className="card-body">

        <div className=" justify-center items-center">
          <div className="">
            {(room.backgroundImage) ?
              <img src={room.backgroundImage || ""} alt={room.name} className="h-48 object-cover rounded-lg mb-4" />
              : null}
            <h3 className="card-title text-primary-content p-2">{room.id} {room.name}</h3>
            <div className="card-actions">
              <a href={`/rooms/${room.id}`} className="btn btn-accent">
                Go to Room
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
