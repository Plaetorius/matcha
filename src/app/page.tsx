import { auth } from "@/auth";
import UserSessionInfo from "@/components/UserSessionInfo";

export default async function Home() {
  const session = await auth();

  return (
    <UserSessionInfo session={session} />
      
  );
}
