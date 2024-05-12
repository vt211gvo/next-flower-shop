import {getOrders} from "@/lib/api/orders/queries";

export default async function OrdersPage() {
    const { orders } = await getOrders()
    return (
        <div>
            {orders.map(order => (
                <div key={order.id}>
                    {JSON.stringify(order)}
                </div>
            ))}
        </div>
    )
}
