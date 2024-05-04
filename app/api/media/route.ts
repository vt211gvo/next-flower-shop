import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import * as Sentry from '@sentry/nextjs';

import {
  createMedia,
  deleteMedia,
  updateMedia,
} from "@/lib/api/media/mutations";
import { 
  mediaIdSchema,
  insertMediaParams,
  updateMediaParams 
} from "@/lib/db/schema/media";

export async function POST(req: Request) {
  try {
    const validatedData = insertMediaParams.parse(await req.json());
    const { media } = await createMedia(validatedData);

    revalidatePath("/media"); // optional - assumes you will have named route same as entity

    return NextResponse.json(media, { status: 201 });
  } catch (err) {
    Sentry.captureException(err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateMediaParams.parse(await req.json());
    const validatedParams = mediaIdSchema.parse({ id });

    const { media } = await updateMedia(validatedParams.id, validatedData);

    return NextResponse.json(media, { status: 200 });
  } catch (err) {
    Sentry.captureException(err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = mediaIdSchema.parse({ id });
    const { media } = await deleteMedia(validatedParams.id);

    return NextResponse.json(media, { status: 200 });
  } catch (err) {
    Sentry.captureException(err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
