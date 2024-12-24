"use client";

import {
	CardBody,
	CardHeader,
	Divider
} from "@nextui-org/react";

export default function PageClient() {
	return (
		<>
			<CardHeader className="text-2xl font-semibold text-default">
				Chat
			</CardHeader>
			<Divider />
			<CardBody>Chat goes here</CardBody>
		</>
	)
}