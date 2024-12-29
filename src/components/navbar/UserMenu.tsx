"use client";

import { signOutUser } from "@/app/actions/authActions";
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from "@nextui-org/react";
import { Session } from "next-auth";
import Link from "next/link";

type UserMenuProps = {
	userInfo: { name: string | null, image: string | null } | null | undefined;
};

export default function UserMenu({
	userInfo
}: UserMenuProps) {
	return (
		<Dropdown>
			<DropdownTrigger>
				<Avatar 
					isBordered
					as="button"
					className="transition-transform"
					color="secondary"
					name={userInfo?.name || "user avatar"}
					size="sm"
					src={userInfo?.image || "/images/user.png"}
				/>
			</DropdownTrigger>
			<DropdownMenu>
				<DropdownSection showDivider>
					<DropdownItem
						isReadOnly
						as="span"
						className="h-14 flex flex-row"
						aria-label="username"
					>
						Signed in as {userInfo?.name}
					</DropdownItem>
				</DropdownSection>
				<DropdownItem
					as="div"
					key="edit"
					className="p-0"
				>
					<Link href="/members/edit" className="block w-full h-full p-2">
							Edit Profile
					</Link>
				</DropdownItem>
				<DropdownItem
					key="logout"
					color="danger"
					onClick={async () => signOutUser()}
				>
					Log out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}