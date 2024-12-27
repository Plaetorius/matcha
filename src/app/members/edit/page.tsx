import { getAuthUserId } from "@/app/actions/authActions"
import { getMemberByUserId } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import EditProfile from "./pageClient";

export default async function MemberEditPage() {
  const userId = await getAuthUserId();

  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  // return <div>Hello {member.name}</div>
  return <EditProfile member={member} />
}