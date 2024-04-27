import {Toaster} from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import {PropsWithChildren} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import s from "@/style/modules/navbar.module.scss"
import { Button } from 'antd';
import Sidebar from "@/components/Sidebar";
import NextAuthProvider from "@/lib/auth/Provider";

interface Props extends PropsWithChildren {
}

export default function AppLayout({children}: Props) {
    return (<main>
        <NextAuthProvider>
        <div className="flex h-screen">
            <div className="text-teal sm:text-primary md:text-secondary lg:text-destructive">Text</div>
            <Sidebar/>
            <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
                <Navbar/>
                {children}
            </main>
        </div>
        </NextAuthProvider>

        <Toaster richColors/>
    </main>)
}