import { z } from "zod"

// String ID validator for our custom IDs
const stringIdSchema = z.string().min(1, "ID is required").max(20, "ID too long")

export const createMessageSchema = z.object({
  content: z.string().min(1, "Message content is required").max(1000, "Message too long"),
  matchId: stringIdSchema.optional(),
  tournamentId: stringIdSchema.optional(),
  recipientId: stringIdSchema.optional(),
})

export const updateMessageSchema = createMessageSchema.partial()

export const createChatRoomSchema = z.object({
  name: z.string().min(1, "Chat room name is required"),
  type: z.enum(["PUBLIC", "PRIVATE", "MATCH", "TOURNAMENT"]),
  matchId: stringIdSchema.optional(),
  tournamentId: stringIdSchema.optional(),
})

export type CreateMessageInput = z.infer<typeof createMessageSchema>
export type UpdateMessageInput = z.infer<typeof updateMessageSchema>
export type CreateChatRoomInput = z.infer<typeof createChatRoomSchema> 