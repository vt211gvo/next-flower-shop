'use client'
import {Button} from "@/components/ui/button";
import {Product} from "@/lib/db/schema/products";
import {useTransition} from "react";
import {addCartCountAction} from "@/lib/actions/carts";
import Image from "next/image";

interface Props {
    order: {
        id: string
        product: Product
        userId: string
    };
}

export function OrderListElement({order}: Props) {
    const [, startTransition] = useTransition()

    const plusHandler = () => {
        startTransition(async () => {
            await addCartCountAction(order.id, 1)
        })
    }

    const minusHandler = () => {
        startTransition(async () => {
            await addCartCountAction(order.id, -1)
        })
    }

    let {id, product, userId} = order;
    return (
        <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                alt="Product Image"
                className="rounded-md object-cover"
                height={80}
                src="https://www.lighting.philips.com.au/content/dam/b2b-philips-lighting/ecat-fallback.png?wid=896&hei=504&qlt=82"
                style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                }}
                width={80}
            />
            <div className="flex-1 grid gap-1">
                <h3 className="font-medium">
                    {product.name}
                </h3>
                <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">$19.99</div>
                </div>
            </div>
            <Button className="ml-auto" size="icon" variant="ghost">
                Go to order
            </Button>
        </div>
    )
}
