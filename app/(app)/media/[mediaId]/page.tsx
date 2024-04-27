import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getMediaById } from "@/lib/api/media/queries";
import OptimisticMedia from "./OptimisticMedia";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function MediaPage({
  params,
}: {
  params: { mediaId: string };
}) {

  return (
    <main className="overflow-auto">
      <Media id={params.mediaId} />
    </main>
  );
}

const Media = async ({ id }: { id: string }) => {
  
  const { media } = await getMediaById(id);
  

  if (!media) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="media" />
        <OptimisticMedia media={media}  />
      </div>
    </Suspense>
  );
};
