"use client";

import CardInnerWrapper from "@/components/CardInnerWrapper";
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
	return (<CardInnerWrapper header="Profile" body={member.description} />);
}
