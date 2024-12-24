import { getMemberByUserId } from '@/app/actions/memberActions';
import { CardBody, CardHeader, Divider } from '@nextui-org/react';
import { notFound } from 'next/navigation';
import React from 'react'
import PageClient from './pageClient';

export default async function MemberDetailedPage({
	params,
}: {
	params: { userId: string };
}) {
	const member = await getMemberByUserId(params.userId);

	if (!member) return notFound();

	return <PageClient member={member}/>;
}

