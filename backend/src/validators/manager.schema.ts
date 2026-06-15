import { z } from "zod"

export const createManagerSchema = z.object({
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  experience: z.union([z.number().min(0, "Experience must be non-negative"), z.string().transform(val => parseInt(val) || 0)]).optional(),
})

export const updateManagerSchema = createManagerSchema.partial()

export type CreateManagerInput = z.infer<typeof createManagerSchema>
export type UpdateManagerInput = z.infer<typeof updateManagerSchema> 