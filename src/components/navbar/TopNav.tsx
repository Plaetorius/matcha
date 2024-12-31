import { auth } from "@/auth";
import TopNavLayout from "./TopNavLayout";
import { getUserInfoForNav } from "@/app/actions/userActions";


export default async function TopNav() {
	const session = await auth();
	const userInfo = session?.user && (await getUserInfoForNav());

	return <TopNavLayout userInfo={userInfo}/>;
}
