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
import { signInUser } from '@/app/actions/authActions';
import { toast } from "react-toastify";

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
		const result = await signInUser(data);
		console.log("result SignInUser::: ", result);
		if (result.status === "success") {
			const event = new Event("visibilitychange");
			document.dispatchEvent(event);
			router.push("/members");
			router.refresh();
			toast.success("Welcome back!");
		} else {
			toast.error(result.error as string);
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
							value={'test@example.com'} // TODO remove me
						/>
						<Input
							defaultValue=''
							label='Password'
							variant='bordered'
							// type='password'
							{...register("password")}
							isInvalid={!!errors.password}
							errorMessage={
								errors.password?.message as string
							}
							value={'test1234'} // TODO remove me
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
