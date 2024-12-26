"use client";

import React from 'react';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Input
} from "@nextui-org/react";
import { GiPadlock } from 'react-icons/gi';
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from '@/lib/schemas/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { signIn } from 'next-auth/react';

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: {isValid, errors}
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	});

	const router = useRouter();

	const onSubmit = async (data: LoginSchema) => { 
		const result = await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
		});

		if (result?.error) {
			switch (result?.error) {
				case 'CredentialsSignin':
					toast.error("Invalid credentials");
					break;
				default:
					toast.error("Unknown error");
			}			
		} else {
			const event = new Event("sessionUpdated");
			document.dispatchEvent(event);
			router.push("/members");
			router.refresh();
			toast.success("Welcome back!");
		}
	};

	return (
		<Card className='w-2/5 mx-auto'>
			<CardHeader className='flex flex-col items-center justify-center'>
				<div className='flex flex-col gap-2 items-center text-default'>
					<div className='flex flex-row items-center gap-3'>
						<GiPadlock size={30} />
						<h1 className='text-3xl font-semibold'>
							Login
						</h1>
					</div>
					<p className='text-neutral-500'>
						Welcome back to Matcha!
					</p>
				</div>
			</CardHeader>
			<CardBody>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<Input
							defaultValue=''
							label="Email"
							variant='bordered'
							{...register("email")}
							isInvalid={!!errors.email}
							errorMessage={
								errors.email?.message as string
							}
						/>
						<Input
							defaultValue=''
							label='Password'
							variant='bordered'
							type='password'
							{...register("password")}
							isInvalid={!!errors.password}
							errorMessage={
								errors.password?.message as string
							}
						/>
						<Button
							fullWidth
							color='default'
							type='submit'
							isDisabled={!isValid}
						>
							Login
						</Button>
					</div>
				</form>
			</CardBody>
		</Card>
	);
}
