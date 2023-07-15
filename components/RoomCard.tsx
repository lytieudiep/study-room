// SpaceCard.js
import { RoomTruncated } from '@/entities/rooms';
import React from 'react';

const RoomCard = ({ room }: {room: RoomTruncated}) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-80 bg-white rounded-lg shadow-md p-4">
        <img src={room.backgroundImage || ""} alt={room.name} className="h-48 w-full object-cover rounded-lg mb-4" />
        <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
        <a href={`/rooms/${room.id}`} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg inline-block">
          Go to Space
        </a>
      </div>
    </div>
  );
};

export default RoomCard;
