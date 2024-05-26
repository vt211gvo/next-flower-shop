import {PropsWithChildren} from "react";

interface Props extends PropsWithChildren {}
export function ProductsGrid({ children }: Props) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4">
            {children}
        </div>
    )
}
