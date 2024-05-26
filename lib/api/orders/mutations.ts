import { db } from "@/lib/db";
import { 
  OrderId, 
  NewOrderParams,
  UpdateOrderParams, 
  updateOrderSchema,
  insertOrderSchema, 
  orderIdSchema 
} from "@/lib/db/schema/orders";
import { getUserAuth } from "@/lib/auth/utils";

export const createOrder = async (order: NewOrderParams) => {
  const { session } = await getUserAuth();
  const newOrder = insertOrderSchema.parse({ ...order, userId: session?.user.id! });
  try {
    const o = await db.order.create({ data: newOrder });
    return { order: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateOrder = async (id: OrderId, order: UpdateOrderParams) => {
  const { session } = await getUserAuth();
  const { id: orderId } = orderIdSchema.parse({ id });
  const newOrder = updateOrderSchema.parse({ ...order, userId: session?.user.id! });
  try {
    const o = await db.order.update({ where: { id: orderId, userId: session?.user.id! }, data: newOrder})
    return { order: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteOrder = async (id: OrderId) => {
  const { session } = await getUserAuth();
  const { id: orderId } = orderIdSchema.parse({ id });
  try {
    const o = await db.order.delete({ where: { id: orderId, userId: session?.user.id! }})
    return { order: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const confirmOrder = async () => {
  const { session } = await getUserAuth();
  try {
    const carts = await db.cart.findMany({
      where: {
        userId: session?.user.id!
      },
      include: {
        product: true
      }
    })

    const allPrice = carts.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.count * (currentValue?.product?.price ?? 0))
    }, 0)

    // const order = await db.order.create({
    //   data: {
    //
    //   }
    // })

  } catch (err) {

  }
}

