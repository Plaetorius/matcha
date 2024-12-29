"use client";

import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Member } from "@prisma/client"
import EditForm from "./EditForm";
import CardInnerWrapper from "@/components/CardInnerWrapper";

type Props = {
	member: Member;
};

export default function EditProfile({
	member,
}: Props) {
	const body = (
		<>
			<EditForm member={member} />
		</>
	)
	return (<CardInnerWrapper header="Edit Profile" body={body} />)
}