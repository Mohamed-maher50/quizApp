import { z } from "zod";

export const createRoomSchema = z
  .object({
    title: z.string().min(2, { message: "To Short Room Name " }),
    description: z
      .union([z.string().min(3, { message: "to short description" }), z.null()])
      .optional()
      .default(null),
    isPrivate: z.boolean().optional(),
    password: z
      .union([
        z.string().min(8, { message: "Password is too short" }),
        z.null(),
      ])

      .optional()
      .default(null),
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
