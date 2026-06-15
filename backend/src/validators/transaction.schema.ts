import { z } from "zod"

export const coinPurchaseSchema = z.object({
  amount: z.number().min(100, "Minimum purchase amount is 100 coins"),
  paymentMethod: z.enum(["stripe", "bkash", "nagad"]),
  paymentDetails: z.object({}).optional(),
})

export const withdrawalSchema = z.object({
  amount: z.number().min(500, "Minimum withdrawal amount is 500 coins"),
  phoneNumber: z.string().regex(/^(\+88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
})
