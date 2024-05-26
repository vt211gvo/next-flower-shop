'use client'
import {Product} from "@/lib/db/schema/products";
import {HeartIcon, ShoppingCartIcon} from "lucide-react";
import {useTransition} from "react";
import {addProductToCartAction} from "@/lib/actions/carts";
import Link from "next/link";

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
        <div className="p-5 w-56 border rounded-md mt-5">
            <Link href={`/products/${product.id}`}>
                <img
                    src="https://www.lighting.philips.com.au/content/dam/b2b-philips-lighting/ecat-fallback.png?wid=896&hei=504&qlt=82"
                    alt=""
                    className="aspect-video object-cover rounded-sm mb-2"
                />
                <h3 className="font-bold">
                    {product.name}
                </h3>
                <h4 className="line-clamp-2">
                    {product.description}
                </h4>
            </Link>
            <h4>{product.price}грн</h4>
            <div className="flex gap-3 mt-2">
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
