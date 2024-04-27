import * as z from "zod"
import { CompleteProduct, relatedProductSchema } from "./index"

export const mediaSchema = z.object({
  id: z.string(),
  path: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  productGalleryId: z.string().nullish(),
  productPreviewId: z.string().nullish(),
})

export interface CompleteMedia extends z.infer<typeof mediaSchema> {
  productGallery?: CompleteProduct | null
  productPreview?: CompleteProduct | null
}

/**
 * relatedMediaSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedMediaSchema: z.ZodSchema<CompleteMedia> = z.lazy(() => mediaSchema.extend({
  productGallery: relatedProductSchema.nullish(),
  productPreview: relatedProductSchema.nullish(),
}))
