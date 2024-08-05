import { createRoomSchema } from "@/services/validation/CreateRoomValidator";
import { z } from "zod";

export type createRoomSchemaTypes = z.infer<typeof createRoomSchema>;
export interface createNewRoomActionProps extends createRoomSchemaTypes {
  userId: string;
}
