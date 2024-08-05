import { z } from "zod";

export const createRoomSchema = z
  .object({
    title: z.string().min(2, { message: "To Short Room Name " }),
    description: z
      .string()
      .min(3, { message: "to short description" })
      .optional(),
    isPrivate: z.boolean().optional(),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .optional(),
  })
  .superRefine((data, clx) => {
    if (data.isPrivate && !data.password) {
      return clx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "password Required when room is private",
        path: ["password"],
      });
    }
    return true;
  });
