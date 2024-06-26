import * as z from "zod"
import { CompleteAccount, relatedAccountSchema, CompleteSession, relatedSessionSchema, CompleteSubscription, relatedSubscriptionSchema, CompleteOrder, relatedOrderSchema, CompleteCart, relatedCartSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  subscription?: CompleteSubscription | null
  orders: CompleteOrder[]
  carts: CompleteCart[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  accounts: relatedAccountSchema.array(),
  sessions: relatedSessionSchema.array(),
  subscription: relatedSubscriptionSchema.nullish(),
  orders: relatedOrderSchema.array(),
  carts: relatedCartSchema.array(),
}))
