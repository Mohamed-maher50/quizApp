import { PrismaClient } from "@prisma/client";
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
