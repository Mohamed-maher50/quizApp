import { z } from "zod";
export const answerSchema = z.object({
  answerId: z.string(),
  studentId: z.string(),
  questionId: z.string(),
});

export const answersSchema = z.object({
  answers: z.array(answerSchema),
  roomId: z.string(),
});
