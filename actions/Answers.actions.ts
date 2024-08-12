"use server";

import { ISubmitUserAnswerAction } from "@/interfaces/interfaces.actions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const submitUserAnswerAction = async ({
  answers,
  userId,
  roomId,
}: ISubmitUserAnswerAction) => {
  const answersWithUserId = answers.map((data) => {
    return {
      ...data,
      userId,
      roomId,
    };
  });
  try {
    const data = await prisma.answers.createMany({
      data: answersWithUserId,
    });
    console.log(data);

    return data;
  } catch (error) {
    console.error(`Error while submitting answer: ${error}`);
  }
};
