import { db } from "@/lib/db/index";
import {
  CartId,
  NewCartParams,
  UpdateCartParams,
  updateCartSchema,
  insertCartSchema,
  cartIdSchema, addProductCountParams
} from "@/lib/db/schema/carts";
import { getUserAuth } from "@/lib/auth/utils";
import {ProductId, productIdSchema} from "@/lib/db/schema/products";

export const createCart = async (cart: NewCartParams) => {
  const { session } = await getUserAuth();
  const newCart = insertCartSchema.parse({ ...cart, userId: session?.user.id! });
  try {
    const c = await db.cart.create({ data: newCart });
    return { cart: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCart = async (id: CartId, cart: UpdateCartParams) => {
  const { session } = await getUserAuth();
  const { id: cartId } = cartIdSchema.parse({ id });
  const newCart = updateCartSchema.parse({ ...cart, userId: session?.user.id! });
  try {
    const c = await db.cart.update({ where: { id: cartId, userId: session?.user.id! }, data: newCart})
    return { cart: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCart = async (id: CartId) => {
  const { session } = await getUserAuth();
  const { id: cartId } = cartIdSchema.parse({ id });
  try {
    const c = await db.cart.delete({ where: { id: cartId, userId: session?.user.id! }})
    return { cart: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const addProductToCart = async (id: ProductId) => {
  const { session } = await getUserAuth();
  const { id: productId } = productIdSchema.parse({ id });
  try {
    return await db.cart.create({
      data: {
        userId: session?.user.id!,
        count: 1,
        productId: productId,
      }
    })
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
}

export const addCartCount = async (id: CartId, value: number) => {
  const { session } = await getUserAuth();
  const { id: cartId, number } = addProductCountParams.parse({ id, number: value });
  try {
    const c = await db.cart.update({
      where: {
        id: cartId,
        userId: session?.user.id!,
      },
      data: {
        count: {
          increment: number,
        },
      },
    });
    return { cart: c };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};

export const deleteCartByProductId = async (id: ProductId) => {
  const { session } = await getUserAuth();
  const { id: productId } = productIdSchema.parse({ id });
  try {
    const f = await db.cart.deleteMany({
      where: {
        productId,
        userId: session?.user.id!,
      },
    });
    return { cart: f };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    throw new Error(message);
  }
};
