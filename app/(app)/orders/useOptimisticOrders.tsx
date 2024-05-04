import { type Product } from "@/lib/db/schema/products";
import { type Order, type CompleteOrder } from "@/lib/db/schema/orders";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Order>) => void;

export const useOptimisticOrders = (
  orders: CompleteOrder[],
  products: Product[]
) => {
  const [optimisticOrders, addOptimisticOrder] = useOptimistic(
    orders,
    (
      currentState: CompleteOrder[],
      action: OptimisticAction<Order>,
    ): CompleteOrder[] => {
      const { data } = action;

      const optimisticProduct = products.find(
        (product) => product.id === data.productId,
      )!;

      const optimisticOrder = {
        ...data,
        product: optimisticProduct,
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticOrder]
            : [...currentState, optimisticOrder];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticOrder } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticOrder, optimisticOrders };
};
