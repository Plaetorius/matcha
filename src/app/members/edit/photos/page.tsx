import { getAuthUserId } from "@/app/actions/authActions";
import {
	getMemberByUserId,
	getMemberPhotosByUserId,
} from "@/app/actions/memberActions";
import React from 'react'
import MemberPhotoUpload from "./MemberPhotoUpload";
import PageClient from "./pageClient";

export default async function PhotosPage() {
	const userId = await getAuthUserId();
	const member = await getMemberByUserId(userId) ?? null;
	const photos = await getMemberPhotosByUserId(
		userId
	);

	return (<PageClient photos={photos} member={member} />);
}
