"use client";

import React, { ReactNode } from "react";
import MemberSidebar from "../MemberSidebar";
import { Card } from "@nextui-org/react";
import { Member } from "@prisma/client";

export default function LayoutClient({
	children,
	member,

}: {
	children: ReactNode,
	member: Member,
}) {
	const basePath = `/members/${member.userId}`;

	const navLinks = [
		{ name: "Profile", href: `${basePath}` },
		{
			name: "Photos",
			href: `${basePath}/photos`,
		},
		{ name: "Chat", href: `${basePath}/chat` },
	];
	return (
		<div className="grid grid-cols-12 gap-5 h-[80vh]">
			<div className="col-span-3">
				<MemberSidebar member={member} navLinks={navLinks}/>
			</div>
			<div className="col-span-9">
				<Card className="w-full mt-10 h-[80vh]">
					{children}
				</Card>
			</div>
		</div>
	);
}