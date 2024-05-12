'use server'

import {getProducts} from "@/lib/api/products/queries";
import {ProductsGrid} from "@/components/products/ProductsGrid";
import {ProductCard} from "@/components/products/ProductCard";
import {Suspense} from "react";
import Loading from "@/app/loading";

export default async function OrdersPage() {

    const products = await getProducts()

    return (
        <Suspense fallback={<Loading/>}>
            <ProductsGrid>
                {products.map((product) =>
                    <ProductCard key={product.id} product={product}/>
                )}
            </ProductsGrid>
        </Suspense>
    )
}
