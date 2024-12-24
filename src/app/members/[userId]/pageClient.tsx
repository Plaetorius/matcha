"use client";

import {
	CardBody,
	CardHeader,
	Divider
} from "@nextui-org/react";
import { Member } from "@prisma/client";

export default function pageClient({
	member
} : {
	member: Member,

}) {
	return (
		<>
			<CardHeader className='text-2xl font-semibold text-default'>
				Profile
			</CardHeader>
			<Divider />
			<CardBody>{member.description}</CardBody>
		</>
	)
}
