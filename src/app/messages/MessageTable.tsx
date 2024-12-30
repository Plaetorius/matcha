"use client";

import { MessageDto } from "@/types";
import {
	Avatar,
	Button,
	Card,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from "@nextui-org/react";
import {
	useRouter,
	useSearchParams
} from "next/navigation";
import React, {
	Key,
	useCallback,
	useState,
} from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteMessage } from "../actions/messageActions";
import { truncateString } from "@/lib/util";

type Props = {
	messages: MessageDto[];
};

const outboxColumns = [
	{ key: "recipientName", label: "Recipient" },
	{ key: "text", label: "Message" },
	{ key: "created", label: "Date sent" },
	{ key: "actions", label: "Actions" },
];

const inboxColumns = [
	{ key: "senderName", label: "Sender" },
	{ key: "text", label: "Message" },
	{ key: "created", label: "Date received" },
	{ key: "actions", label: "Actions" },
];

export default function MessageTable({
	messages,
}: Props) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const isOutBox = searchParams.get("container") === "outbox";

	const [isDeleting, setDeleting] = useState({
		id: "",
		loading: false,
	});

	const columns = isOutBox
		? outboxColumns
		: inboxColumns;

	const handleDeleteMessage = useCallback(
		async (message: MessageDto) => {
			setDeleting({
				id: message.id,
				loading: true,
			});
			await deleteMessage(message.id, isOutBox);
			router.refresh();
			setDeleting({ id: "", loading: false });
		}, [isOutBox, router]
	);

	const handleRowSelect = (key: Key) => {
		const message = messages.find(
			(m) => m.id === key
		);
		const url = isOutBox
			? `/members/${message?.recipientId}`
			: `/members/${message?.senderId}`;
		router.push(url + "/chat");
	};

	const renderCell = useCallback((
		item: MessageDto,
		columnKey: keyof MessageDto
	) => {
		const cellValue = item[columnKey];

		switch (columnKey) {
			case "recipientName":
			case "senderName":
				return (
					<div className="flex items-center gap-2 cursor-pointer">
						<Avatar
							alt="Image of member"
							src={
								(isOutBox
									? item.recipientImage
									: item.senderImage) ||
								"/images/user.png"
							}
						/>
						<span>{cellValue}</span>
					</div>
				);
			case "text":
				return (
					<div>
						{truncateString(cellValue, 80)}
					</div>
				);
			case "created":
				return cellValue;
			default:
				return (
					<Button
						isIconOnly
						variant="light"
						onClick={() =>
							handleDeleteMessage(item)
						}
						isLoading={
							isDeleting.id === item.id &&
							isDeleting.loading
						}
					>
						<AiFillDelete
							size={24}
							className="text-danger"
						/>
					</Button>
				);
		}
	},
	[
		isOutBox,
		isDeleting.id,
		isDeleting.loading,
		handleDeleteMessage,
	]
	);

	return (
		<Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
			<Table 
				aria-label="Table with messages"
				selectionMode="single"
				onRowAction={(key) =>
					handleRowSelect(key)
				}
				shadow="none"
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							key={column.key}
							width={
								column.key === "text"
									? "50%"
									: undefined
							}
						>
							{column.label}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody
					items={messages}
					emptyContent="No messages for this container!"
				>
					{(item) => (
						<TableRow
							key={item.id}
							className="cursor-pointer"
						>
							{(columnKey) => (
								<TableCell
									className={`${
										!item.dateRead && !isOutBox
											? "font-semibold"
											: ""
									}`}
								>
									{renderCell(
										item,
										columnKey as keyof MessageDto
									)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</Card>
	);
}