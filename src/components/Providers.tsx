"use client";

import { NextUIProvider } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';



export default function Providers({
	children,
 }: {
		children: ReactNode,
}) {
	return (
		<SessionProvider>
			<NextUIProvider>
				<ToastContainer 
					position="bottom-right"
				/>
				{children}
			</NextUIProvider>
		</SessionProvider>
	)
}
