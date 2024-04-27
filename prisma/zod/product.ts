import * as z from "zod"
import { CompleteMedia, relatedMediaSchema } from "./index"

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

export interface CompleteProduct extends z.infer<typeof productSchema> {
  preview?: CompleteMedia | null
  gallery: CompleteMedia[]
}

/**
 * relatedProductSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProductSchema: z.ZodSchema<CompleteProduct> = z.lazy(() => productSchema.extend({
  preview: relatedMediaSchema.nullish(),
  gallery: relatedMediaSchema.array(),
}))
