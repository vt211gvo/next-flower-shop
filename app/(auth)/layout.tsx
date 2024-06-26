import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import {ReactNode} from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getUserAuth();
  if (session?.session) redirect("/admin/dashboard");

  return children
}
