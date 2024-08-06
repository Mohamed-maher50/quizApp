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

export const joinToRoomAction = async ({
  code,
  password = undefined,
  userId,
}: {
  code: string;
  password?: string | null;
  userId: string;
}) => {
  try {
    const room = await prisma.room.findFirst({
      where: {
        code,
        password,
      },
    });
    if (!room) throw new Error(`Could not find room`);
    if (!room?.members.includes(userId)) {
      room.members.push(userId);
    }
    await prisma.room.update({
      where: { id: room.id },
      data: { members: room.members },
    });
  } catch (error) {
    console.log(` Error while joining to room: ${error}`);
  }
};
