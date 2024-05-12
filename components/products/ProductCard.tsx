'use client'
import {Product} from "@/lib/db/schema/products";
import {HeartIcon, ShoppingCartIcon} from "lucide-react";
import {useTransition} from "react";
import {addProductToCartAction} from "@/lib/actions/carts";

interface Props {
    product: Product;
}

export function ProductCard({product}: Props) {

    const [, startTransition] = useTransition();

    const addProductToCartHandler = () => {
        startTransition(async () => {
            await addProductToCartAction(product.id)
        })
    }

    return (
        <div className="p-5 w-56">
            <img src="" alt=""/>
            <h3>{product.name}</h3>
            <h4 className="line-clamp-2">{product.description}</h4>
            <h4>{product.price}грн</h4>
            <div>
                <button onClick={addProductToCartHandler}>
                    <ShoppingCartIcon/>
                </button>
                <button>
                    <HeartIcon/>
                </button>
            </div>
        </div>
    )
}
