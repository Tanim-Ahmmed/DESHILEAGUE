import { z } from "zod"

// Common string ID validator for our custom IDs
export const stringIdSchema = z.string().min(1, "ID is required").max(20, "ID too long")

// Parameter validation schemas for routes
export const paramsWithIdSchema = z.object({
  params: z.object({
    id: stringIdSchema,
  }),
})

export const paramsWithTournamentIdSchema = z.object({
  params: z.object({
    tournamentId: stringIdSchema,
  }),
})

export const paramsWithTeamIdSchema = z.object({
  params: z.object({
    teamId: stringIdSchema,
  }),
})

export const paramsWithPlayerIdSchema = z.object({
  params: z.object({
    playerId: stringIdSchema,
  }),
})

// Export all schemas
export * from "./auth.schema"
export * from "./organizer.schema"
export * from "./manager.schema"
export * from "./player.schema"
export * from "./tournament.schema"
export * from "./match.schema"
export * from "./chat.schema"
export * from "./transaction.schema"
export * from "./admin.validators"
