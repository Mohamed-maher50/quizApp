"use server";
import { updateRoomActionProps } from "@/interfaces/interfaces.actions";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

interface getMyRoomsActionProps {
  userId: string;
}
interface getRoomActionProps extends Prisma.RoomFindManyArgs {}
export const getMyRooms = async function (
  { userId }: getMyRoomsActionProps,
  { skip, take }: getRoomActionProps
) {
  try {
    const count = await prisma.room.count({
      where: {
        creator: userId,
      },
    });
    const rooms = await prisma.room.findMany({
      skip,
      take,
      where: {
        creator: userId,
      },
    });
    return { data: rooms, count: count };
  } catch (error) {
    console.error(`Error while getting my rooms: ${error}`);
  }
};
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
    if (room) {
      // Check if the user is already a member
      if (!room.members.some((member) => member === userId)) {
        // Add the user to the members array
        await prisma.room.update({
          where: { id: room.id }, // Use the room's unique identifier (id) for the update
          data: {
            members: {
              push: userId,
            },
          },
        });
      }
    } else {
      console.log("No matching room found.");
    }
  } catch (error) {
    console.log(` Error while joining to room: ${error}`);
  }
};
