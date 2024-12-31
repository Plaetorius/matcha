"use client";

import { NextUIProvider } from "@nextui-org/react";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { usePresenceChannel } from "@/app/hooks/usePresenceChannel";
import { useNotificationChannel } from "@/app/hooks/useNotificationChannel";
import useMessageStore from "@/app/hooks/useMessageStore";
import { getUnreadMessageCount } from "@/app/actions/messageActions";

export default function Providers({
	children,
	userId,
 }: {
		children: ReactNode,
		userId: string | null,
}) {
	const insUnreadCountSet = useRef(false);
  // const { updateUnreadCount } = useMessageStore(
  //   (state) => ({
  //     updateUnreadCount: state.updateUnreadCount,
  //   })
  // );
	// const setUnreadCount = useCallback(
	// 	(amount: number) => {
	// 		updateUnreadCount(amount);
	// 	},
	// 	[updateUnreadCount]
	// );

	// useEffect(() => {
	// 	if (!insUnreadCountSet.current && userId) {
	// 		getUnreadMessageCount().then((count) => {
	// 			setUnreadCount(count);
	// 		});
	// 		insUnreadCountSet.current = true;
	// 	}
	// }, [setUnreadCount, userId]);

	// usePresenceChannel();
	useNotificationChannel(userId);

	return (
		<NextUIProvider>
			<ToastContainer 
				position="bottom-right"
			/>
			{children}
		</NextUIProvider>
	);
}
