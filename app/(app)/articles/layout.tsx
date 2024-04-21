'use client'
import {PropsWithChildren} from "react";
import Link from "next/link";

interface Props extends PropsWithChildren {}

function ArticlesLayout({children}: Props) {
    return (
        <div>
            <header className="flex gap-5 p-1 underline text-zinc-500">
                <Link href="/articles">Articles</Link>
                <Link href="/articles/favorite">Articles favorite</Link>
                <Link href="/articles/create">Articles create</Link>
            </header>
            {children}
        </div>
    )
}
export default ArticlesLayout