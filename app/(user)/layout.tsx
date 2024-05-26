import {checkAuth, getUserAuth} from "@/lib/auth/utils";
import {PropsWithChildren} from "react";
import {Navbar} from "@/components/layout/Navbar";

interface Props extends PropsWithChildren {
}

export default async function UsersLayout({ children }: Props) {
    await checkAuth()
    const session = await getUserAuth();

    return (
        <>
            <Navbar signedIn={!!session}/>
            {children}
        </>
    )
}