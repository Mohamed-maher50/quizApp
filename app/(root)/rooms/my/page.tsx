import { getMyRooms } from "@/actions/Rooms";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const myRooms = async () => {
  const user = await currentUser();
  const rooms = await getMyRooms({ userId: user?.id as string });

  return (
    <main>
      <div className="container mx-auto">
        <div>
          {rooms?.map((room) => {
            return <div key={room.id}>{room.id}</div>;
          })}
        </div>
      </div>
    </main>
  );
};

export default myRooms;
