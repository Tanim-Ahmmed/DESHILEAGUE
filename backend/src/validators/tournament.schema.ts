import { z } from "zod";

const stringIdSchema = z
  .string()
  .min(1, "ID is required")
  .max(20, "ID too long");

export const createTournamentSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    gameType: z.string().min(1, "Game type is required"),
    entryFee: z.coerce.number().min(1, "Entry fee must be at least 1"),
    matchOvers: z.coerce.number().min(5).max(10, "Overs must be between 5-10"),
    numberOfPlayers: z.coerce
      .number()
      .min(5)
      .max(10, "Players must be between 5-10"),
    pitchType: z.enum(["short", "long"]).optional(),
    boundarySize: z.enum(["small", "medium", "large"]).optional(),
    isRunningAllowed: z.coerce.boolean(),
    enableSixRuns: z.coerce.boolean(),
    enableFastBowlers: z.coerce.boolean(),
    tournamentDateTime: z.string().min(1, "Date time is required"),
    numberOfTeams: z.coerce.number().min(2).max(16),
    autoFixture: z.coerce.boolean(),
    location: z.string().min(5, "Location must be at least 5 characters"),
    contactNumber: z.string().min(11, "Contact number required"),
    tournamentImage: z.string().url().optional().nullable(),
    prizePoolDetails: z.string().optional(),
    fieldDetails: z.string().optional(),
  }),
});

export const joinTournamentSchema = z.object({
  teamName: z.string().min(2).max(30),
});

export const updateTournamentSchema = createTournamentSchema.partial();
