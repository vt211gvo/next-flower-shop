import Link from "next/link";
import {getUserAuth} from "@/lib/auth/utils";
import {Navbar} from "@/components/layout/Navbar";
import flowers_header from "@/public/main_page/flowers_header.png"
import Image from "next/image";
import {Suspense} from "react";
import Loading from "@/app/loading";
import {ProductsGrid} from "@/components/products/ProductsGrid";
import {ProductCard} from "@/components/products/ProductCard";
import {getProducts} from "@/lib/api/products/queries";
export default async function LandingPage() {
    const {session} = await getUserAuth()
    const { products } = await getProducts()

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar signedIn={!!session}/>
            <main className="flex-1">
                <section className="w-full sm:py-3 md:py-8 lg:py-10 xl:py-16">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="bg-neutral-100 dark:bg-neutral-800 mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square">
                                <Image src={flowers_header} className="size-full object-cover" alt="flowers"/>
                            </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Welcome to Blooms Shop <br/><br/>
                                    </h1>
                                    <p className="max-w-[600px] text-neutral-500 md:text-xl dark:text-neutral-400">
                                        At Blooms Shop, we believe in the power of flowers to brighten your day,
                                        express your emotions, and create unforgettable memories.

                                        With our extensive selection of premium blooms and
                                        convenient online ordering, sending flowers has never been
                                        easier or more delightful.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-8 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
                                        href="/products"
                                    >
                                        Products
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="features" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                    Products
                                </h2>
                            </div>
                        </div>
                        <Suspense fallback={<Loading/>}>
                            <ProductsGrid>
                                {products.slice(0,16).map((product) =>
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                )}
                            </ProductsGrid>
                        </Suspense>
                        {/*<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">*/}
                        {/*    <div*/}
                        {/*        className="mx-auto aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-xl object-cover object-center sm:w-full lg:order-last"/>*/}
                        {/*    <div className="flex flex-col justify-center space-y-4">*/}
                        {/*        <ul className="grid gap-6">*/}
                        {/*            <li>*/}
                        {/*                <div className="grid gap-1">*/}
                        {/*                    <h3 className="text-xl font-bold">Collaboration</h3>*/}
                        {/*                    <p className="text-neutral-500 dark:text-neutral-400">*/}
                        {/*                        Make collaboration seamless with built-in code review*/}
                        {/*                        tools.*/}
                        {/*                    </p>*/}
                        {/*                </div>*/}
                        {/*            </li>*/}
                        {/*            <li>*/}
                        {/*                <div className="grid gap-1">*/}
                        {/*                    <h3 className="text-xl font-bold">Automation</h3>*/}
                        {/*                    <p className="text-neutral-500 dark:text-neutral-400">*/}
                        {/*                        Automate your workflow with continuous integration.*/}
                        {/*                    </p>*/}
                        {/*                </div>*/}
                        {/*            </li>*/}
                        {/*            <li>*/}
                        {/*                <div className="grid gap-1">*/}
                        {/*                    <h3 className="text-xl font-bold">Scale</h3>*/}
                        {/*                    <p className="text-neutral-500 dark:text-neutral-400">*/}
                        {/*                        Deploy to the cloud with a single click and scale with*/}
                        {/*                        ease.*/}
                        {/*                    </p>*/}
                        {/*                </div>*/}
                        {/*            </li>*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 border-t">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                    Sign Up for Updates
                                </h2>
                                <p className="max-w-[600px] text-neutral-500 md:text-xl dark:text-neutral-400">
                                    Stay updated with the latest product news and updates.
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <form className="flex sm:flex-row flex-col space-y-2 sm:space-y-0 sm:space-x-2">
                                    <input
                                        className="max-w-lg flex-1 px-4 py-2 border-border border rounded-md "
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                    <button
                                        type="submit"
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
                                    >
                                        Sign Up
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer
                className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    © 2024 Acme Inc. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
