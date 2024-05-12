import { db } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";
import { type OrderId, orderIdSchema } from "@/lib/db/schema/orders";

export const getOrders = async () => {
  const { session } = await getUserAuth();
  const o = await db.order.findMany({
    where: {
      userId: session?.user.id!
    },
    include: {
      product: true
    }
  });
  return { orders: o };
};

export const getOrderById = async (id: OrderId) => {
  const { session } = await getUserAuth();
  const { id: orderId } = orderIdSchema.parse({ id });
  const o = await db.order.findFirst({
    where: {
      id: orderId,
      userId: session?.user.id!
    },
    include: {
      product: true
    }
  });
  return { order: o };
};


