"use client";

import { CardBody, CardHeader, Divider } from '@nextui-org/react';
import { Member, Photo } from '@prisma/client';
import React from 'react'
import MemberPhotoUpload from './MemberPhotoUpload';
import MemberPhotos from '@/components/MemberPhotos';

type Props = {
	photos: Photo[] | null;
	member: Member | null;
}

export default function PageClient({ photos, member} : Props) {
	// TODO maybe handle specifically !member

	return (
		<>
			<CardHeader className='flez flez-row justify-between items-center'>
				<div className='text-2xl font-semibold text-default'>
					Edit Profile
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<MemberPhotoUpload />
				<MemberPhotos
					photos={photos}
					editing={true}
					mainImageUrl={member?.image}
				/>
			</CardBody>
		</>
	)
}
