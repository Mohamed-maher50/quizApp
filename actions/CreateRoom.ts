"use server";
import { createNewRoomActionProps } from "@/interfaces/interfaces.actions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createNewRoomAction = async ({
  userId,
  ...values
}: createNewRoomActionProps) => {
  try {
    const room = await prisma.room.create({
      data: {
        creator: userId,
        members: [],
        ...values,
      },
    });

    return room;
  } catch (error) {
    console.log(`Error during creating room: ${error}`);
  }
};
