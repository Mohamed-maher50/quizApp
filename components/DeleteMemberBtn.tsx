"use client";
import React from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
// import { deleteMemberAction } from "@/actions/Rooms";

function DeleteMemberBtn({ id }: { id: string }) {
  // const deleteMemberHandler = async () => await deleteMemberAction(id);
  return (
    <Button
      // onClick={deleteMemberHandler}
      variant={"ghost"}
      className="  p-1 h-fit text-red-700 hover:text-red-400 px-2 top-3 right-3"
    >
      <Trash size={16} />
    </Button>
  );
}

export default DeleteMemberBtn;
