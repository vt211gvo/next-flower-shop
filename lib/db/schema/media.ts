import { mediaSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getMedia } from "@/lib/api/media/queries";


// Schema for media - used to validate API requests
const baseSchema = mediaSchema.omit(timestamps)

export const insertMediaSchema = baseSchema.omit({ id: true });
export const insertMediaParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateMediaSchema = baseSchema;
export const updateMediaParams = updateMediaSchema.extend({})
export const mediaIdSchema = baseSchema.pick({ id: true });

// Types for media - used to type API request params and within Components
export type Media = z.infer<typeof mediaSchema>;
export type NewMedia = z.infer<typeof insertMediaSchema>;
export type NewMediaParams = z.infer<typeof insertMediaParams>;
export type UpdateMediaParams = z.infer<typeof updateMediaParams>;
export type MediaId = z.infer<typeof mediaIdSchema>["id"];
    
// this type infers the return from getMedia() - meaning it will include any joins
export type CompleteMedia = Awaited<ReturnType<typeof getMedia>>["media"][number];

