import CreateRoomForm from "@/components/CreateRoomForm";
import React from "react";

const page = ({ params: { id } }: { params: { id: string } }) => {
  console.log(id);
  return (
    <main className="h-full ">
      <div className="container mx-auto">
        <CreateRoomForm roomId={id} />
      </div>
    </main>
  );
};

export default page;
