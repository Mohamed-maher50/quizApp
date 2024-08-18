import { createRoomSchema } from "@/services/validation/CreateRoomValidator";
import { JoinToRoomSchema } from "@/services/validation/JoinToRoomValidator";
import {
  answerSchema,
  answersSchema,
} from "@/services/validation/QuestionsValidator";
import { Answers, Questions } from "@prisma/client";
import { z } from "zod";

export type createRoomSchemaTypes = z.infer<typeof createRoomSchema>;
export type JoinToRoomSchemaTypes = z.infer<typeof JoinToRoomSchema>;
export type answerSchemaTypes = z.infer<typeof answerSchema>;
export type answersSchemaTypes = z.infer<typeof answersSchema>;

export interface createNewRoomActionProps extends createRoomSchemaTypes {
  userId: string;
}
export interface updateRoomActionProps extends Partial<createRoomSchemaTypes> {
  userId: string;
  roomId: string;
}

export interface ISubmitUserAnswerAction {
  answers: answerSchemaTypes[];
  roomId: string;
  studentId: string;
}
export interface updateQuestionActionProps {
  questionId: string;
  data: Partial<Questions>;
}
export interface updateAnswersActionProps {
  answers: Array<Partial<Answers>>;
}
