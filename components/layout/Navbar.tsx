import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo_icon.svg";
import {ShoppingCartIcon} from "lucide-react";
import {UserDropdown} from "@/components/layout/UserDropdown";
import {SignInButton} from "@/components/layout/SignInButton";

interface Props {
    signedIn: boolean
}

export function Navbar({signedIn}: Props) {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <nav className="flex gap-4 sm:gap-6 justify-between items-center w-full">
                <Link
                    className="text-sm font-medium hover:underline underline-offset-4"
                    href="/products"
                >
                    <Image height={44} src={logo} alt="logo"/>
                </Link>
                <div className="flex gap-5">
                    {
                        signedIn
                            ? <>
                                <Link
                                    className="text-sm font-medium hover:underline underline-offset-4"
                                    href="/cart"
                                >
                                    <ShoppingCartIcon/>
                                </Link>
                                <UserDropdown/>
                            </>
                            : <SignInButton/>
                    }
                </div>
            </nav>
        </header>
    )
}