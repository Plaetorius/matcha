import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import LayoutClient from "./layoutClient";

export default async function Layout({
	children,
}: {
	children: ReactNode;
}) {
	const userId = await getAuthUserId();

	const member = await getMemberByUserId(userId);
	if (!member) return notFound();

	const basePath = `/members/edit`;

	const navLinks = [
		{
			name: 'Edit Profile',
			href: `${basePath}`,
		},
		{
			name: 'Update Photos',
			href: `${basePath}/photos`,
		},
	];

	return (
	<LayoutClient member={member} navLinks={navLinks}>
		{children}
	</LayoutClient>
	);
}