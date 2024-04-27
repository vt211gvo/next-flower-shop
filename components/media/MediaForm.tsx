import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/media/useOptimisticMedia";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";



import { type Media, insertMediaParams } from "@/lib/db/schema/media";
import {
  createMediaAction,
  deleteMediaAction,
  updateMediaAction,
} from "@/lib/actions/media";


const MediaForm = ({
  
  media,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  media?: Media | null;
  
  openModal?: (media?: Media) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Media>(insertMediaParams);
  const editing = !!media?.id;
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("media");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: Media },
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Media ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const mediaParsed = await insertMediaParams.safeParseAsync({  ...payload });
    if (!mediaParsed.success) {
      setErrors(mediaParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = mediaParsed.data;
    const pendingMedia: Media = {
      updatedAt: media?.updatedAt ?? new Date(),
      createdAt: media?.createdAt ?? new Date(),
      id: media?.id ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingMedia,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateMediaAction({ ...values, id: media.id })
          : await createMediaAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingMedia 
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8"}>
      {/* Schema fields start */}
              <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.path ? "text-destructive" : "",
          )}
        >
          Path
        </Label>
        <Input
          type="text"
          name="path"
          className={cn(errors?.path ? "ring ring-destructive" : "")}
          defaultValue={media?.path ?? ""}
        />
        {errors?.path ? (
          <p className="text-xs text-destructive mt-2">{errors.path[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic && addOptimistic({ action: "delete", data: media });
              const error = await deleteMediaAction(media.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: media,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default MediaForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
