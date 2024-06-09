'use client'
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { useTransition } from "react";
import { addCartCountAction, deleteCartAction } from "@/lib/actions/carts";
import { CompleteProduct } from "@/prisma/zod";

interface Props {
    cart: {
        count: number;
        id: string;
        product: CompleteProduct;
        userId: string;
    };
}

export function CartListElement({ cart }: Props) {
    const [, startTransition] = useTransition();

    const plusHandler = () => {
        startTransition(async () => {
            await addCartCountAction(cart.id, 1);
        });
    };

    const minusHandler = () => {
        startTransition(async () => {
            await addCartCountAction(cart.id, -1);
        });
    };

    const removeHandler = () => {
        startTransition(async () => {
            await deleteCartAction(cart.id);
        });
    };

    const { count, product } = cart;

    return (
        <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 mb-2">
            <img
                src={product?.preview?.path ?? "https://www.lighting.philips.com.au/content/dam/b2b-philips-lighting/ecat-fallback.png?wid=896&hei=504&qlt=82"}
                alt="Product Image"
                className="aspect-video object-cover rounded-sm mb-2"
                width={80}
                height={80}
            />
            <div className="flex-1 grid gap-1">
                <h3 className="font-medium">{product.name}</h3>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <Button
                            className="h-8 w-8"
                            size="icon"
                            variant="outline"
                            onClick={minusHandler}
                        >
                            <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium">{count}</span>
                        <Button
                            className="h-8 w-8"
                            size="icon"
                            variant="outline"
                            onClick={plusHandler}
                        >
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="text-sm font-medium">
                        ${(product?.price ?? 0) * count}
                    </div>
                </div>
            </div>
            <Button className="ml-auto" size="icon" variant="ghost" onClick={removeHandler}>
                <XIcon className="h-5 w-5" />
            </Button>
        </div>
    );
}
