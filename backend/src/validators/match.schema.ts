import { z } from "zod"

// String ID validator for our custom IDs
const stringIdSchema = z.string().min(1, "ID is required").max(20, "ID too long")

export const createMatchSchema = z.object({
  tournamentId: stringIdSchema,
  team1Id: stringIdSchema,
  team2Id: stringIdSchema,
  scheduledDate: z.string().datetime("Invalid date format"),
  venue: z.string().min(1, "Venue is required"),
  format: z.enum(["T20", "ODI", "TEST"]),
  overs: z.number().min(1, "Overs must be at least 1"),
})

export const updateMatchSchema = createMatchSchema.partial()

export const updateMatchScoreSchema = z.object({
  team1Score: z.number().min(0, "Score must be non-negative").optional(),
  team2Score: z.number().min(0, "Score must be non-negative").optional(),
  team1Wickets: z.number().min(0, "Wickets must be non-negative").optional(),
  team2Wickets: z.number().min(0, "Wickets must be non-negative").optional(),
  status: z.enum(["SCHEDULED", "LIVE", "COMPLETED", "CANCELLED"]).optional(),
})

export type CreateMatchInput = z.infer<typeof createMatchSchema>
export type UpdateMatchInput = z.infer<typeof updateMatchSchema>
export type UpdateMatchScoreInput = z.infer<typeof updateMatchScoreSchema> 