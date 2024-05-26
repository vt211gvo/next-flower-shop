'use client'
import {Button} from "@/components/ui/button";
import {useTransition} from "react";
import {confirmOrderAction} from "@/lib/actions/orders";

export function CartConfirmOrder() {
    const [, startTransition] = useTransition();

    const confirmOrderHandler = () => {
        startTransition(async () => {
            await confirmOrderAction()
        })
    }

    return (
        <div>
            <Button onClick={confirmOrderHandler}>
                Confirm order
            </Button>
        </div>
    )
}