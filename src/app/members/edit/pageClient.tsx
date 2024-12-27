"use client";

import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Member } from "@prisma/client"
import EditForm from "./EditForm";

type Props = {
	member: Member;
};

export default function EditProfile({
	member,
}: Props) {
	return (
		<>
			<CardHeader className="text-2xl font-semibold text-default">
				Edit Profile
			</CardHeader>
			<Divider />
			<CardBody>
				<EditForm member={member} />
			</CardBody>
		</>
	)
}