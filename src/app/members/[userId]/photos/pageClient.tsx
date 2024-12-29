"use client";

import CardInnerWrapper from "@/components/CardInnerWrapper";
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
	const body = (
		<>
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
			</>
	)
	return (<CardInnerWrapper header="Photos" body={body} />);
}