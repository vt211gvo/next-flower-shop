import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
// import { type TAddOptimistic } from "@/app/(app)/products/useOptimisticProducts";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";

import {type Product, insertProductParams, CompleteProduct} from "@/lib/db/schema/products";
import {
  createProductAction,
  deleteProductAction,
  updateProductAction,
} from "@/lib/actions/products";
import {TAddOptimistic} from "@/app/admin/products/useOptimisticProducts";
import * as Sentry from '@sentry/nextjs';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Media} from "@/lib/db/schema/media";

const ProductForm = ({
  product,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
  media
}: {
  product?: CompleteProduct | null;
  openModal?: (product?: Product) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
  media?: Media[]
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Product>(insertProductParams);
  const editing = !!product?.id;
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("products");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: Product },
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
      toast.success(`Product ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const productParsed = await insertProductParams.safeParseAsync({  ...payload });
    if (!productParsed.success) {
      setErrors(productParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = productParsed.data;
    const pendingProduct: Product = {
      updatedAt: product?.updatedAt ?? new Date(),
      createdAt: product?.createdAt ?? new Date(),
      id: product?.id ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingProduct,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateProductAction({ ...values, id: product.id })
          : await createProductAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingProduct 
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      Sentry.captureException(e);
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
                  errors?.name ? "text-destructive" : "",
              )}
          >
            Name
          </Label>
          <Input
              type="text"
              name="name"
              className={cn(errors?.name ? "ring ring-destructive" : "")}
              defaultValue={product?.name ?? ""}
          />
          {errors?.name ? (
              <p className="text-xs text-destructive mt-2">{errors.name[0]}</p>
          ) : (
              <div className="h-6"/>
          )}
        </div>
        <div>
          <Label
              className={cn(
                  "mb-2 inline-block",
                  errors?.price ? "text-destructive" : "",
              )}
          >
            Price
          </Label>
          <Input
              type="text"
              name="price"
              className={cn(errors?.price ? "ring ring-destructive" : "")}
              defaultValue={product?.price ?? ""}
          />
          {errors?.price ? (
              <p className="text-xs text-destructive mt-2">{errors.price[0]}</p>
          ) : (
              <div className="h-6"/>
          )}
        </div>
        <div>
          <Label
              className={cn(
                  "mb-2 inline-block",
                  errors?.description ? "text-destructive" : "",
              )}
          >
            Description
          </Label>
          <Input
              type="text"
              name="description"
              className={cn(errors?.description ? "ring ring-destructive" : "")}
              defaultValue={product?.description ?? ""}
          />
          {errors?.description ? (
              <p className="text-xs text-destructive mt-2">{errors.description[0]}</p>
          ) : (
              <div className="h-6"/>
          )}
        </div>
        <div>
          <Label
              className={cn(
                  "mb-2 inline-block",
                  errors?.brand ? "text-destructive" : "",
              )}
          >
            Brand
          </Label>
          <Input
              type="text"
              name="brand"
              className={cn(errors?.brand ? "ring ring-destructive" : "")}
              defaultValue={product?.brand ?? ""}
          />
          {errors?.brand ? (
              <p className="text-xs text-destructive mt-2">{errors.brand[0]}</p>
          ) : (
              <div className="h-6"/>
          )}
        </div>
        <div>
          <Label
              className={cn(
                  "mb-2 inline-block",
                  errors?.article ? "text-destructive" : "",
              )}
          >
            Article
          </Label>
          <Input
              type="text"
              name="article"
              className={cn(errors?.article ? "ring ring-destructive" : "")}
              defaultValue={product?.article ?? ""}
          />
          {errors?.article ? (
              <p className="text-xs text-destructive mt-2">{errors.article[0]}</p>
          ) : (
              <div className="h-6"/>
          )}
        </div>
        <div>
          <Label
              className={cn(
                  "mb-2 inline-block",
                  // errors?.productId ? "text-destructive" : "",
              )}
          >
            Preview
          </Label>
          <Select defaultValue={product?.preview?.id} name="productId">
            <SelectTrigger
                // className={cn(errors?.productId ? "ring ring-destructive" : "")}
            >
              <SelectValue placeholder="Select a product"/>
            </SelectTrigger>
            <SelectContent>
              {media?.map((media) => (
                  <SelectItem key={media?.id} value={media?.id.toString()}>
                    {media?.id}
                  </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/*{errors?.p ? (*/}
          {/*    <p className="text-xs text-destructive mt-2">{errors.productId[0]}</p>*/}
          {/*) : (*/}
              <div className="h-6"/>
          {/*)}*/}
        </div>
        {/* Schema fields end */}

        {/* Save Button */}
        <SaveButton errors={hasErrors} editing={editing}/>

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
                    addOptimistic && addOptimistic({action: "delete", data: product});
                    const error = await deleteProductAction(product.id);
                    setIsDeleting(false);
                    const errorFormatted = {
                      error: error ?? "Error",
                      values: product,
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

export default ProductForm;

const SaveButton = ({
                      editing,
                      errors,
                    }: {
  editing: Boolean;
  errors: boolean;
}) => {
  const {pending} = useFormStatus();
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
