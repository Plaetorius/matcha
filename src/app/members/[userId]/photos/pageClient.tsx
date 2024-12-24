"use client";

import {
	CardHeader,
	Divider,
	CardBody,
	Image,
} from "@nextui-org/react";
import { Photo } from "@prisma/client";

export default function PageClient({
	photos,
}: {
	photos: Photo[] | null;
}) {
	return (
		<>
			<CardHeader className="text-2xl font-semibold text-default">
				Photos
			</CardHeader>
			<Divider />
			<CardBody>
				<div className="grid grid-cols-5 gap-3">
					{photos &&
						photos.map((photo) => (
							<div key={photo.id}>
								<Image
									src={photo.url}
									alt="Image of member"
									className="object-cover aspect-square"
								/>
							</div>
						))}
				</div>
			</CardBody>
		</>
	)
}