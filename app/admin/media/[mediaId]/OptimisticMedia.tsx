"use client";

import { useOptimistic, useState } from "react";
import { type Media } from "@/lib/db/schema/media";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import MediaForm from "@/components/media/MediaForm";
import {TAddOptimistic} from "@/app/admin/media/useOptimisticMedia";


export default function OptimisticMedia({ 
  media,
   
}: { 
  media: Media; 
  
  
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Media) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticMedia, setOptimisticMedia] = useOptimistic(media);
  const updateMedia: TAddOptimistic = (input) =>
    setOptimisticMedia({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <MediaForm
          media={optimisticMedia}
          
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateMedia}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticMedia.path}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticMedia.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticMedia, null, 2)}
      </pre>
    </div>
  );
}
