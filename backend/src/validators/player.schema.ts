import { z } from "zod"

export const createPlayerSchema = z.object({
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  age: z.number().min(16, "Player must be at least 16 years old").max(60, "Player must be under 60 years old"),
  battingStyle: z.enum(["RIGHT", "LEFT"]).optional(),
  bowlingStyle: z.enum(["FAST", "MEDIUM", "SPIN"]).optional(),
  role: z.enum(["BATSMAN", "BOWLER", "ALL_ROUNDER", "WICKET_KEEPER"]).optional(),
})

export const updatePlayerSchema = createPlayerSchema.partial()

export type CreatePlayerInput = z.infer<typeof createPlayerSchema>
export type UpdatePlayerInput = z.infer<typeof updatePlayerSchema> 