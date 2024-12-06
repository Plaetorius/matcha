"use client";

import { NextUIProvider } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function Providers({
	children,
 }: {
		children: ReactNode,
}) {
	return (
		<SessionProvider>
			<NextUIProvider>
				{children}
			</NextUIProvider>
		</SessionProvider>
	)
}
