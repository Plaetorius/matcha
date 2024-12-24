import { getMemberByUserId } from "@/app/actions/memberActions";
import React, { ReactNode } from "react";
import MemberSidebar from "../MemberSidebar";
import { notFound } from "next/navigation";
import { Card } from "@nextui-org/react";
import LayoutClient from "./layoutClient";

export default async function Layout({
	children,
	params,
}: {
	children: ReactNode,
	params: { userId: string }
}) {
	
	const member = await getMemberByUserId(
		params.userId
	);
	if (!member) return notFound();

	return (
		<LayoutClient member={member}>
			{children}
		</LayoutClient>
	)
}