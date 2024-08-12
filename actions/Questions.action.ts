"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getQuestionsAction = async ({ roomId }: { roomId: string }) => {
  try {
    const data = await prisma.question.findMany({
      where: {
        roomId,
      },
      include: {
        room: true,
      },
    });

    return data;
  } catch (error) {
    console.error(`Error while getting questions  for ${roomId} ${error}`);
  }
};
