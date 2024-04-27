import * as z from "zod"

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().nullish(),
  description: z.string().nullish(),
  brand: z.string().nullish(),
  article: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
