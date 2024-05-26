"use client";
import { signOut } from 'next-auth/react'

export function SignOutBtn() {
  const handleSignOut = async () => {
    await signOut()
  };

  return (
    <button
        onClick={handleSignOut}
        className="w-full text-left"
    >
      Sign out
    </button>
  );
}
