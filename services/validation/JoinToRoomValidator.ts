import { z } from "zod";
export const JoinToRoomSchema = z
  .object({
    code: z.string(),
    password: z
      .string()
      .min(8, {
        message: "password must be at least 8 characters",
      })
      .optional(),
    isPrivate: z.boolean().default(false),
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
