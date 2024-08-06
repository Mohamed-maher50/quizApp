"use server";
import { updateRoomActionProps } from "@/interfaces/interfaces.actions";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const getMyRooms = async function ({ userId }: { userId: string }) {
  try {
    const rooms = await prisma.room.findMany({
      where: {
        creator: userId,
      },
    });
    return rooms;
  } catch (error) {
    console.error(`Error while getting my rooms: ${error}`);
  }
};

export const updateRoomAction = async ({
  userId,
  roomId,

  ...updatedValues
}: updateRoomActionProps) => {
  try {
    const room = await prisma.room.update({
      where: { id: roomId, creator: userId },
      data: {
        ...updatedValues,
      },
    });

    revalidatePath("/rooms/my");
    return room;
  } catch (error) {
    console.error(`Error while updating room: ${error}`);
  }
};
