import { createRoomSchema } from "@/services/validation/CreateRoomValidator";
import { JoinToRoomSchema } from "@/services/validation/JoinToRoomValidator";
import { z } from "zod";

export type createRoomSchemaTypes = z.infer<typeof createRoomSchema>;
export type JoinToRoomSchemaTypes = z.infer<typeof JoinToRoomSchema>;
export interface createNewRoomActionProps extends createRoomSchemaTypes {
  userId: string;
}
export interface updateRoomActionProps extends Partial<createRoomSchemaTypes> {
  userId: string;
  roomId: string;
}
