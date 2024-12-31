"use client";

import {
	Button,
	Navbar,
	NavbarBrand,
	NavbarContent,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { GiSelfLove } from "react-icons/gi";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";

type TopNavLayoutProps = {
	userInfo: { name: string | null, image: string | null } | null | undefined;
};

export default function TopNavLayout({ userInfo }: TopNavLayoutProps) {	
	return (
		<Navbar
			maxWidth="full"
			className="bg-gradient-to-r from-pink-400 via-red-400 to-pink-600"
			classNames={{
				item: [
					"text-xl",
					"text-white",
					"uppercase",
					"data=[active=true]: text-yellow-200"
				]
			}}
		>
			<NavbarBrand as={Link} href="/">
				<GiSelfLove
					size={40}
					color="white"
				/>
				<div className="font-bold text-3xl flex">
					<span className="text-white">
						Matcha
					</span>
				</div>
			</NavbarBrand>
			<NavbarContent justify="center">
				<NavLink
					href="/members"
					label="Matches"
				/>
				<NavLink
					href="/lists"
					label="Lists"
				/>
				<NavLink
					href="/messages"
					label="Messages"
				/>
			</NavbarContent>
			<NavbarContent justify="end">
			{ userInfo ? (
				<UserMenu userInfo={userInfo}/>
			) : (
				<>
					<Button
						as={Link}
						href="/login"
						variant="bordered"
						className="text-white"
						>
						Login
					</Button>
					<Button
						as={Link}
						href="/register"
						variant="bordered"
						className="text-white"
						>
						Register
					</Button>
				</>
			)}
			</NavbarContent>
		</Navbar>
	);
}