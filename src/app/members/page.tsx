"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

export default function MembersPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>User is not authenticated</p>;
  }

  if (status === "authenticated") {
    console.log("User details: ", session.user);
    return <p>Signed in as {session.user?.email}</p>;
  }

  return (
    <div>
      

      <h3 className="text-3xl">
        This will be the members page
      </h3>
      <Link href="/">Go back home</Link>
    </div>
  );
}
