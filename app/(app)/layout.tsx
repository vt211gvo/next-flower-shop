'use client'
import {Toaster} from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import {PropsWithChildren} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface Props extends PropsWithChildren {
}

const routes = [
    {
        path: "/articles",
        label: "Arctiles"
    },
    {
        path: "/articles/favorite",
        label: "Articles Favorite"
    },
    {
        path: "/articles/create",
        label: "Articles Create"
    },
    {
        path: "/profile/security",
        label: "Profile Security"
    },
    {
        path: "/profile/settings",
        label: "Profile Settings"
    }
]

export default function AppLayout({children}: Props) {

    const pathname = usePathname()

    return (<main>
        {/*<NextAuthProvider>*/}
            <header className="flex gap-5">
                {
                    routes.map(({path, label}) => (
                        <Link
                            href={path}
                            key={path}
                            className={pathname === path ? 'text-red-500' : ''}
                        >
                            {label}
                        </Link>
                    ))
                }
            </header>
            <div className="flex h-screen">
                {/*<Sidebar/>*/}
                <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
                    <Navbar/>
                    {children}
                </main>
            </div>
        {/*</NextAuthProvider>*/}

        <Toaster richColors/>
    </main>)
}