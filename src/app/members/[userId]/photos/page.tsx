import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import { 
	CardBody,
	CardHeader,
	Divider,
	Image
} from "@nextui-org/react";
import React from "react";
import PageClient from "./pageClient";

export default async function PhotosPage({
	params,
}: {
	params: {userId: string };
}) {
	const photos = await getMemberPhotosByUserId(
		params.userId
	);

	return <PageClient photos={photos} />
}
