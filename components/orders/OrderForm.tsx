import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/admin/orders/useOptimisticOrders";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { type Order, insertOrderParams } from "@/lib/db/schema/orders";
import {
  createOrderAction,
  deleteOrderAction,
  updateOrderAction,
} from "@/lib/actions/orders";
import { type Product, type ProductId } from "@/lib/db/schema/products";

const OrderForm = ({
  products,
  productId,
  order,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  order?: Order | null;
  products: Product[];
  productId?: ProductId
  openModal?: (order?: Order) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Order>(insertOrderParams);
  const editing = !!order?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("orders");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: Order },
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
      toast.success(`Order ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const orderParsed = await insertOrderParams.safeParseAsync({ productId, ...payload });
    if (!orderParsed.success) {
      setErrors(orderParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = orderParsed.data;
    const pendingOrder: Order = {
      updatedAt: order?.updatedAt ?? new Date(),
      createdAt: order?.createdAt ?? new Date(),
      id: order?.id ?? "",
      userId: order?.userId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingOrder,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateOrderAction({ ...values, id: order.id })
          : await createOrderAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingOrder
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

      {productId ? null : <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.productId ? "text-destructive" : "",
          )}
        >
          Product
        </Label>
        <Select defaultValue={order?.productId} name="productId">
          <SelectTrigger
            className={cn(errors?.productId ? "ring ring-destructive" : "")}
          >
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
          {products?.map((product) => (
            <SelectItem key={product.id} value={product.id.toString()}>
              {product.id}{/* TODO: Replace with a field from the product model */}
            </SelectItem>
           ))}
          </SelectContent>
        </Select>
        {errors?.productId ? (
          <p className="text-xs text-destructive mt-2">{errors.productId[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div> }
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.count ? "text-destructive" : "",
          )}
        >
          Count
        </Label>
        <Input
          type="text"
          name="count"
          className={cn(errors?.count ? "ring ring-destructive" : "")}
          defaultValue={order?.count ?? ""}
        />
        {errors?.count ? (
          <p className="text-xs text-destructive mt-2">{errors.count[0]}</p>
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
              addOptimistic && addOptimistic({ action: "delete", data: order });
              const error = await deleteOrderAction(order.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: order,
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

export default OrderForm;

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
