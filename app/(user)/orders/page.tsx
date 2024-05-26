import {getOrders} from "@/lib/api/orders/queries";
import {Suspense} from "react";
import Loading from "@/app/loading";
import {OrderListElement} from "@/components/orders/OrderListElemet";

export default async function OrdersPage() {
    const {orders} = await getOrders()

    return (
        <div>
            <Suspense fallback={<Loading/>}>
                {orders.map(order => (
                    <OrderListElement key={order.id} order={order}/>
                ))}
            </Suspense>
        </div>
    )
}
