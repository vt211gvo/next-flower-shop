import { Suspense } from "react";

import Loading from "@/app/loading";
import MediaList from "@/components/media/MediaList";
import { getMedia } from "@/lib/api/media/queries";


export const revalidate = 0;

export default async function MediaPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Media</h1>
        </div>
        <Media />
      </div>
    </main>
  );
}

const Media = async () => {
  
  const { media } = await getMedia();
  
  return (
    <Suspense fallback={<Loading />}>
      <MediaList media={media}  />
    </Suspense>
  );
};
