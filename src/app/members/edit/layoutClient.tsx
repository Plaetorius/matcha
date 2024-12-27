"use client";

import { ReactNode } from "react";
import MemberSidebar from "../MemberSidebar";
import { Card } from "@nextui-org/react";
import { Member } from "@prisma/client";

type Props = {
	children: ReactNode,
	member: Member;
	navLinks: { name: string; href: string }[];
	
}

export default function LayoutClient({
	children,
	member,
	navLinks,
}: Props) {
	return (
		<div className="grid grid-cols-12 gap-5 h-[80vh]">
			<div className="col-span-3">
				<MemberSidebar
					member={member}
					navLinks={navLinks}
				/>
			</div>
			<div className="col-span-9">
				<Card className="w-full mt-10 h-[80vh]">
					{children}
				</Card>
			</div>
		</div>
	);
}