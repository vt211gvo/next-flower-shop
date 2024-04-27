"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Media, CompleteMedia } from "@/lib/db/schema/media";
import Modal from "@/components/shared/Modal";

import { useOptimisticMedia } from "@/app/admin/media/useOptimisticMedia";
import { Button } from "@/components/ui/button";
import MediaForm from "./MediaForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (media?: Media) => void;

export default function MediaList({
  media,
   
}: {
  media: CompleteMedia[];
   
}) {
  const { optimisticMedia, addOptimisticMedia } = useOptimisticMedia(
    media,
     
  );
  const [open, setOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState<Media | null>(null);
  const openModal = (media?: Media) => {
    setOpen(true);
    media ? setActiveMedia(media) : setActiveMedia(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeMedia ? "Edit Media" : "Create Media"}
      >
        <MediaForm
          media={activeMedia}
          addOptimistic={addOptimisticMedia}
          openModal={openModal}
          closeModal={closeModal}
          
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticMedia.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticMedia.map((media) => (
            <Media
              media={media}
              key={media.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Media = ({
  media,
  openModal,
}: {
  media: CompleteMedia;
  openModal: TOpenModal;
}) => {
  const optimistic = media.id === "optimistic";
  const deleting = media.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("media")
    ? pathname
    : pathname + "/media/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{media.path}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + media.id }>
          Edit
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No media
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new media.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Media </Button>
      </div>
    </div>
  );
};
