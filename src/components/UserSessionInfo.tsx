"use client";

import { Session } from "next-auth";
import Form from "next/form";
import { Button } from "@nextui-org/react";
import { FaRegSmile } from "react-icons/fa";
import { signOutUser } from "@/app/actions/authActions";

interface UserSessionInfoProps {
  session: Session | null;
}

export default function UserSessionInfo(session: UserSessionInfoProps) {
	return (
    <div>
      <h1 className="text-3xl">Hello App!</h1>
      <h3 className="text-2xl font-semibold">User session data:</h3>

      { session.session ? (
        <div>
          <pre>
            {JSON.stringify(session, null, 2)}
          </pre>
          <Form action={signOutUser}>
            <Button
            type="submit"
            color="primary"
            variant="bordered"
            startContent={
              <FaRegSmile size={20} />
            }
          >
            Sign Out
            </Button>
          </Form>
        </div>
      ) : (
        <div>
          Not signed in
        </div>
      )}

    </div>
  )}