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
import PresenceAvatar from "@/components/PresenceAvatar";
import { useMessages } from "../hooks/useMessages";
import MessageTableCell from "./MessageTableCell";

type Props = {
	initialMessages: MessageDto[];
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
	initialMessages,
}: Props) {
	const {
		columns,
		isOutBox,
		isDeleting,
		deleteMessage,
		selectRow,
		// messages,
	} = useMessages(initialMessages);

	return (
		<Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
			<Table 
				aria-label="Table with messages"
				selectionMode="single"
				onRowAction={(key) =>
					selectRow(key)
				}
				shadow="none"
			>
				{/* <TableHeader columns={columns}>
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
				</TableHeader> */}
				{/* <TableBody
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
									<MessageTableCell
										item={item}
										columnKey={
											columnKey as string
										}
										isOutbox={isOutBox}
										deleteMessage={deleteMessage}
										isDeleting={
											isDeleting.loading &&
											isDeleting.id === item.id
										}
									/>
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody> */}
			</Table>
		</Card>
	);
}