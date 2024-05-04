import * as z from "zod"
import { CompleteProduct, relatedProductSchema, CompleteUser, relatedUserSchema } from "./index"

export const orderSchema = z.object({
  id: z.string(),
  productId: z.string(),
  count: z.number().int(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteOrder extends z.infer<typeof orderSchema> {
  product: CompleteProduct
  user: CompleteUser
}

/**
 * relatedOrderSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedOrderSchema: z.ZodSchema<CompleteOrder> = z.lazy(() => orderSchema.extend({
  product: relatedProductSchema,
  user: relatedUserSchema,
}))
