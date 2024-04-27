import { db } from "@/lib/db/index";
import { type MediaId, mediaIdSchema } from "@/lib/db/schema/media";

export const getMedia = async () => {
  const m = await db.media.findMany({});
  return { media: m };
};

export const getMediaById = async (id: MediaId) => {
  const { id: mediaId } = mediaIdSchema.parse({ id });
  const m = await db.media.findFirst({
    where: { id: mediaId}});
  return { media: m };
};


