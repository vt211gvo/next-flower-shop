import {getCarts} from "@/lib/api/carts/queries";
import {CartListElement} from "@/components/carts/CartListElement";
import {Suspense} from "react";
import Loading from "@/app/loading";
import {CartConfirmOrder} from "@/components/carts/CartConfirmOrder";

export default async function CartPage() {
    const { carts } = await getCarts()

    const allPrice = carts.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.count * (currentValue?.product?.price ?? 0))
    }, 0)
    return (
        <Suspense fallback={<Loading/>}>
            {carts.map((cart) => (
                <div key={cart.id}>
                    <CartListElement cart={cart}/>
                </div>
            ))}
            <div className="flex justify-between w-full">
                <div className="pl-2 mt-3">
                    Total price ${allPrice}
                </div>
                <CartConfirmOrder/>
            </div>
        </Suspense>
    )
}
