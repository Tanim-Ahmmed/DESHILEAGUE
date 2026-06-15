import { z } from "zod";

export const createOrganizerSchema = z.object({
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const setupOrganizerProfileSchema = z.object({
  groundImage: z.string().url({ message: "groundImage must be a valid URL" }),
  groundLocation: z
    .string()
    .min(5, "Ground location must be at least 5 characters long"),
  umpireContact: z.string(),
  groundName: z.string().min(1,"Ground name is required"),
  hasBat: z.boolean().optional(),
  hasBall: z.boolean().optional(),
  hasStumps: z.boolean().optional(),
  hasGloves: z.boolean().optional(),
  // pre-uploaded urls
  profileImage: z.string().url().optional(),
});

export const updateOrganizerSchema = createOrganizerSchema.partial();

export type CreateOrganizerInput = z.infer<typeof createOrganizerSchema>;
export type UpdateOrganizerInput = z.infer<typeof updateOrganizerSchema>;
export type SetupOrganizerProfileInput = z.infer<
  typeof setupOrganizerProfileSchema
>;
