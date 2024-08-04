"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createNewRoom = async ({
  userId,
  title,
}: {
  userId: string;
  title: string;
}) => {
  try {
    const room = await prisma.room.create({
      data: {
        creator: userId,
        members: [],
        title,
      },
    });
    return room;
  } catch (error) {
    console.log(`Error during creating room: ${error}`);
  }
};
