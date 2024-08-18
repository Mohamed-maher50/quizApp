"use server";
import { updateRoomActionProps } from "@/interfaces/interfaces.actions";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const deleteRoom = async function (roomId: string, userId: string) {
  try {
    const rooms = await prisma.room.delete({
      where: {
        creator: userId,
        id: roomId,
      },
    });
    revalidatePath("/rooms/my");
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
  console.log("roomId " + roomId);
  console.log("userId " + userId);
  try {
    const room = await prisma.room.update({
      where: { id: roomId, creator: userId },
      data: {
        ...updatedValues,
      },
    });
    console.log(room);

    revalidatePath("/rooms/my");
    return room;
  } catch (error) {
    console.error(`Error while updating room: ${error}`);
  }
};

export const getMembersActions = async (roomId: string) => {
  try {
    const members = await prisma.students.findMany({
      where: {
        roomId,
      },
      include: {
        user: true,
      },
    });
    return members;
  } catch (error) {
    console.error(`Error while getting members: ${error}`);
  }
};

export const deleteStudentAction = async (id: string) => {
  try {
    const room = await prisma.students.delete({
      where: {
        id,
      },
    });
    console.log(room);
    revalidatePath(`/dashboard/admin/rooms/${id}/members`);
    return room;
  } catch (error) {
    console.error(`Error while deleting room: ${error}`);
  }
};
