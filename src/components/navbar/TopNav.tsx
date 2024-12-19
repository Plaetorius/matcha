import { auth } from "@/auth";
import TopNavLayout from "./TopNavLayout";

export default async function TopNav() {
	const session = await auth();

	return <TopNavLayout session={session}/>;
}