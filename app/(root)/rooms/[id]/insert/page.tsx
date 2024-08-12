import CreateRoomForm from "@/components/CreateQuistionsForm";
import React from "react";

const page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <main className="h-full ">
      <div className="container mx-auto">
        <CreateRoomForm roomId={id} />
      </div>
    </main>
  );
};

export default page;
