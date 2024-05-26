import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ListOrderedIcon, UserIcon} from "lucide-react";
import Link from "next/link";
import {SignOutBtn} from "@/components/auth/SignOutBtn";

export function UserDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarImage alt="Profile" src="/placeholder-avatar.jpg"/>
                    <AvatarFallback>
                        <UserIcon className="h-5 w-5"/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <Link
                    className="text-sm font-medium hover:underline underline-offset-4"
                    href="/cabinet"
                >
                    <DropdownMenuItem>
                        <UserIcon className="mr-2 h-4 w-4"/>
                        Cabinet
                    </DropdownMenuItem>
                </Link>
                <Link
                    className="text-sm font-medium hover:underline underline-offset-4"
                    href="/orders"
                >
                    <DropdownMenuItem>
                        <ListOrderedIcon className="mr-2 h-4 w-4"/>
                        Orders
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                    <SignOutBtn/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}