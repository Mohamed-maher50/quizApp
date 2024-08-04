"use server";
import { FormValuesTypes } from "@/components/CreateRoomForm";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface CreateQuestionActionProps extends FormValuesTypes {
  roomId: string;
}
export const createQuestionAction = async ({
  correctAnswer,
  question,
  options,
  roomId,
}: CreateQuestionActionProps) => {
  try {
    const room = await prisma.question.create({
      data: {
        question,
        roomId,
        options,
        correctAnswer,
      },
    });
    console.log(room);
    return room;
  } catch (error) {
    console.log(`Error during creating room: ${error}`);
  }
};
