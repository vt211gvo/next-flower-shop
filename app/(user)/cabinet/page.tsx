import {getUserAuth} from "@/lib/auth/utils";
import Link from "next/link";

export default async function CabinetPage() {
    const { session } = await getUserAuth()
    const user = session?.user

    return (
        <div>
            <div>
                Name: {user?.name}
            </div>
            <div>
                Email: {user?.email}
            </div>
            <Link href="/orders">
                Orders
            </Link>
        </div>
    )
}