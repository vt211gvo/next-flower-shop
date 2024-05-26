import Link from "next/link";
import {UserIcon} from "lucide-react";

export function SignInButton() {
    return (
        <Link
            className="text-sm font-medium hover:underline underline-offset-4 flex gap-3 items-center"
            href="/sign-in"
        >
            <UserIcon/>
            Sign In
        </Link>
    )
}