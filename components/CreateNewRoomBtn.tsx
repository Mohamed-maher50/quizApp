"use client";
import React from "react";
import { Button } from "./ui/button";

import { useUser } from "@clerk/nextjs";
import { createNewRoom } from "@/actions/CreateRoom";
import { useRouter } from "next/navigation";

const CreateNewRoomBtn = () => {
  const { user } = useUser();

  const router = useRouter();
  if (!user) router.push("/sign-in");
  const createRoomHandler = async () => {
    const data = await createNewRoom({ userId: user?.id as string });
    if (data) router.push(`/rooms/${data.id}/insert`);
  };
  return (
    <Button onClick={createRoomHandler} variant={"outline"} size={"lg"}>
      New Room
    </Button>
  );
};

export default CreateNewRoomBtn;
