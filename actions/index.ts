"use server";
import {
  createNewRoomActionProps,
  updateAnswersActionProps,
  updateQuestionActionProps,
  updateRoomActionProps,
} from "@/interfaces/interfaces.actions";
import prisma from "./prisma";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { FormValuesTypes } from "@/components/QuestionForm";

interface getMyRoomsActionProps {
  userId: string;
}
interface getRoomActionProps extends Prisma.RoomFindManyArgs {}
export const getStudentAnswers = async (
  {
    roomId,
    userId,
  }: {
    userId: string;
    roomId: string;
  },
  { include, where }: Prisma.UserAnswersFindManyArgs
) => {
  try {
    const data = await prisma.userAnswers.findFirst({
      where: {
        roomId,
        studentId: userId,
        ...where,
      },
      include: {
        userAnswerDetails: {
          include: {
            answer: true,
            question: true,
          },
        },
        room: true,

        student: {
          include: {
            user: {
              select: {
                avatar: true,
                email: true,
                username: true,
              },
            },
          },
        },
      },
    });
    return data;
  } catch {
    console.error("can't get member answers");
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

    if (!room && !password) throw new Error(`not valid code # ${code}`);
    if (!room && password) throw new Error(`not valid password or code`);
    if (!room) throw new Error(`not found room `);
    if (room.creator == userId) throw new Error(`can't join to your room`);
    const student = await prisma.students.create({
      data: {
        roomId: room.id,
        userId,
      },
    });
    return {
      student,
      error: null,
    };
  } catch (error: any) {
    if (error.code == "P2002")
      error.message = "you already joined this room before";
    return {
      student: null,
      error: error.message || "fail to join room",
    };
  }
};
export const createNewRoomAction = async ({
  userId,
  ...values
}: createNewRoomActionProps) => {
  try {
    const room = await prisma.room.create({
      data: {
        creator: userId,
        ...values,
        code: nanoid(6),
      },
    });

    revalidatePath("/rooms/my");
    return room;
  } catch (error) {
    console.log(error);
    console.log(`Error during creating room: ${error}`);
  }
};
export const getMyRooms = async function (
  { userId }: getMyRoomsActionProps,
  { skip, take, include }: getRoomActionProps
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
      include: {
        ...include,
      },
      orderBy: {
        CreateAt: "desc",
      },
    });
    return { data: rooms, count };
  } catch (error) {
    console.error(`Error while getting my rooms: ${error}`);
  }
};
interface CreateQuestionActionProps extends FormValuesTypes {
  roomId: string;
}
export const createQuestionAction = async ({
  answers,
  text,
  roomId,
}: CreateQuestionActionProps) => {
  try {
    const room = await prisma.questions.create({
      data: {
        text,
        roomId,
        Answers: {
          create: answers,
        },
      },
    });
    revalidatePath("/dashboard/rooms/*/questions");
    return room;
  } catch (error) {
    console.log(`Error during creating room: ${error}`);
  }
};

export const updateQuestionAction = async ({
  questionId,
  data,
}: updateQuestionActionProps) => {
  try {
    const question = await prisma.questions.update({
      where: {
        id: questionId,
      },
      data: data,
    });
    revalidatePath("/dashboard/admin/rooms/*/questions");
    return question;
  } catch (error) {
    console.log(`Error during creating room: ${error}`);
  }
};

export const getRoomById = async function (
  { roomId }: { roomId: string },
  { skip, take }: getRoomActionProps
) {
  try {
    const room = await prisma.room.findFirst({
      skip,
      take,
      where: {
        id: roomId,
      },
      include: {
        Question: {
          include: {
            Answers: {
              select: {
                id: true,
                questionId: true,
                text: true,
              },
            },
          },
        },
      },
    });
    return room;
  } catch (error) {
    console.error(`Error while getting my rooms: ${error}`);
  }
};
export const getQuestionsAction = async ({ roomId }: { roomId: string }) => {
  try {
    const data = await prisma.questions.findMany({
      where: {
        roomId,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(`Error while getting questions  for ${roomId} ${error}`);
  }
};
import { ISubmitUserAnswerAction } from "@/interfaces/interfaces.actions";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export const submitUserAnswerAction = async ({
  answers,
  roomId,
  studentId,
}: ISubmitUserAnswerAction) => {
  try {
    await prisma.userAnswers.create({
      data: {
        studentId,
        roomId,
        userAnswerDetails: {
          create: answers,
        },
      },
    });
    await prisma.students.update({
      where: {
        id: studentId,
      },
      data: {
        isSubmitted: true,
      },
    });
    revalidatePath(`/rooms/${roomId}/exam`);
  } catch (error) {
    console.error(`Error while submitting answer: ${error}`);
  }
};

export const updateAnswersAction = async ({
  answers,
}: updateAnswersActionProps) => {
  try {
    const updatePromises = answers.map((answer) =>
      prisma.answers.update({
        where: { id: answer.id },
        data: {
          text: answer.text,
          isCorrect: answer.isCorrect,
        },
      })
    );

    await Promise.all(updatePromises);

    revalidatePath(`/rooms/*/exam`);
  } catch (error) {
    console.error(`Error while submitting answer: ${error}`);
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

    revalidatePath("/dashboard/rooms");
    return room;
  } catch (error) {
    console.error(`Error while updating room: ${error}`);
  }
};
interface IGetMyExamsRoomProps {
  userId: string;
  filter?: Prisma.StudentsFindManyArgs;
}
export const getMyExamsRooms = async ({
  userId,
  filter = {},
}: IGetMyExamsRoomProps) => {
  const { where, include, ...other } = filter;
  try {
    const data = await prisma.students.findMany({
      where: {
        userId,
        ...where,
      },
      include: {
        room: true,
        ...include,
      },
      ...other,
    });

    const count = await prisma.students.count({
      where: {
        userId,
      },
    });
    return { data, count };
  } catch (error) {
    console.error(`Error while getting my exams: ${error}`);
  }
};
// ------------------------------------------------ Users actions --------------------------------
export const getUserByClerk = async ({ clerkId }: { clerkId: string }) => {
  try {
    const student = await prisma.user.findFirst({
      where: {
        clerkUserId: clerkId,
      },
      include: {
        students: true,
      },
    });
    return student;
  } catch (error) {
    console.error("Error while getting student ");
  }
};

//------------------------------------------------- students actions
export const getStudent = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const student = await prisma.students.findFirst({
      where: {
        roomId,
        userId,
      },
      include: {
        user: true,
      },
    });
    return student;
  } catch (error) {
    console.error("Error while getting student ");
  }
};
export const getQuestionsAnswers = async ({
  questionId,
}: {
  questionId: string;
}) => {
  try {
    const answers = await prisma.answers.findMany({
      where: {
        questionId,
      },
    });

    return answers;
  } catch (error) {
    console.error(`Error while getting answers for ${questionId}`);
  }
};

export const getUser = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  // Check if the MongoDB ID is already stored in Clerk's public metadata
  let mongoDBId = clerkUser.publicMetadata.mongoDBId;

  if (!mongoDBId) {
    // If not, find or create the user in MongoDB via Prisma
    let user = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser.id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: clerkUser.emailAddresses[0].emailAddress,
          username:
            clerkUser.username || clerkUser.emailAddresses[0].emailAddress,
          clerkUserId: clerkUser.id,
        },
      });
    }

    // Store the MongoDB ID in Clerk's public metadata
    await clerkClient.users.updateUserMetadata(clerkUser.id, {
      publicMetadata: {
        mongoDBId: user.id,
      },
    });

    mongoDBId = user.id;
  }

  return clerkUser;
};

export const deleteRoom = async function (roomId: string, userId: string) {
  try {
    const room = await prisma.room.delete({
      where: {
        creator: userId,
        id: roomId,
      },
    });
    revalidatePath("/dashboard/rooms");
    return {
      room,
      error: null,
    };
  } catch (error) {
    return {
      room: null,
      error: "some error during deleting room",
    };
  }
};
