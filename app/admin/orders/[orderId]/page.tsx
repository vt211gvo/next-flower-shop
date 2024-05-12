import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getOrderById } from "@/lib/api/orders/queries";
import { getProducts } from "@/lib/api/products/queries";import OptimisticOrder from "./OptimisticOrder";
import { checkAuth } from "@/lib/auth/utils";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function OrderPage({
  params,
}: {
  params: { orderId: string };
}) {

  return (
    <main className="overflow-auto">
      <Order id={params.orderId} />
    </main>
  );
}

const Order = async ({ id }: { id: string }) => {
  await checkAuth();

  const { order } = await getOrderById(id);
  const { products } = await getProducts();

  if (!order) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="orders" />
        <OptimisticOrder order={order} products={products} />
      </div>
    </Suspense>
  );
};
