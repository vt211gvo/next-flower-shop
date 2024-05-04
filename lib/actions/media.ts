"use server";

import { revalidatePath } from "next/cache";
import {
  createMedia,
  deleteMedia,
  updateMedia,
} from "@/lib/api/media/mutations";
import {
  MediaId,
  NewMediaParams,
  UpdateMediaParams,
  mediaIdSchema,
  insertMediaParams,
  updateMediaParams,
} from "@/lib/db/schema/media";
import * as Sentry from '@sentry/nextjs';

const handleErrors = (e: unknown) => {
  Sentry.captureException(e);
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMedia = () => revalidatePath("/media");

export const createMediaAction = async (input: NewMediaParams) => {
  try {
    const payload = insertMediaParams.parse(input);
    await createMedia(payload);
    revalidateMedia();
  } catch (e) {
    Sentry.captureException(e);
    return handleErrors(e);
  }
};

export const updateMediaAction = async (input: UpdateMediaParams) => {
  try {
    const payload = updateMediaParams.parse(input);
    await updateMedia(payload.id, payload);
    revalidateMedia();
  } catch (e) {
    Sentry.captureException(e);
    return handleErrors(e);
  }
};

export const deleteMediaAction = async (input: MediaId) => {
  try {
    const payload = mediaIdSchema.parse({ id: input });
    await deleteMedia(payload.id);
    revalidateMedia();
  } catch (e) {
    return handleErrors(e);
  }
};