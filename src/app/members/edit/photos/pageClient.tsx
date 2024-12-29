"use client";

import { Member, Photo } from '@prisma/client';
import React from 'react'
import MemberPhotoUpload from './MemberPhotoUpload';
import MemberPhotos from '@/components/MemberPhotos';
import CardInnerWrapper from '@/components/CardInnerWrapper';

type Props = {
	photos: Photo[] | null;
	member: Member | null;
}

export default function PageClient({ photos, member} : Props) {
	// TODO maybe handle specifically !member

	const body = (
		<>
			<MemberPhotoUpload />
			<MemberPhotos
				photos={photos}
				editing={true}
				mainImageUrl={member?.image}
			/>
		</>
	);

	return (
		<CardInnerWrapper header="Edit Profile" body={body} />
	)
}
