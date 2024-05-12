import {getCarts} from "@/lib/api/carts/queries";
import {CartListElement} from "@/components/carts/CartListElement";
import {Suspense} from "react";
import Loading from "@/app/loading";
import {Separator} from "@/components/ui/separator";

export default async function CartPage() {
    const { carts } = await getCarts()
    return (
        <Suspense fallback={<Loading/>}>
            {carts.map((cart) => (
                <div key={cart.id}>
                    <CartListElement cart={cart}/>
                    <Separator/>
                </div>
            ))}
        </Suspense>
    )
}
