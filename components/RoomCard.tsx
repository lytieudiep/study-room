// SpaceCard.js
import { RoomTruncated } from '@/entities/rooms';
import React from 'react';

const RoomCard = ({ room }: { room: RoomTruncated }) => {
  return (
    <div className=" bg-base-200">
    <div className="flex justify-center items-center">
      <div className="w-80 bg-neutral rounded-lg shadow-md p-4">
        {(room.backgroundImage) ?
          <img src={room.backgroundImage || ""} alt={room.name} className="h-48 object-cover rounded-lg mb-4" />
          : null}
        <h3 className="text-xl font-semibold mb-2 text-primary-content">{room.id} {room.name}</h3>
        <a href={`/rooms/${room.id}`} className="bg-secondary hover:bg-secondary-focus text-white py-2 px-4 rounded-lg inline-block">
          Go to Space
        </a>
      </div>
    </div>
    </div>
  );
};

export default RoomCard;
