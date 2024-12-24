"use client";

import { registerUser } from "@/app/actions/authActions";
import { RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { toast } from "react-toastify";

export default function RegisterForm() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid, isSubmitting },
	} = useForm<RegisterSchema>({
		mode: "onTouched",
	});

	const router = useRouter();

	const onSubmit = async (
		data: RegisterSchema
	) => {
		const result = await registerUser(data);

		if (result.status === "success") {
			toast.success("Successfully registered!");
			const { email, password } = data;
			const result = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (result?.ok) {
				const event = new Event("sessionUpdated");
				document.dispatchEvent(event);
				router.push("/members");
				toast.success("Logged you in automagically!")
			} else {
				toast.error(result?.error as string);
				router.push("/login");
			}

		} else {
			console.log("Error when registering");
			if (Array.isArray(result.error)) {
				result.error.forEach((e: any) => {
					console.log("e::: ", e);
					const fieldName = e.path.join(".") as 
						| "email"
						| "name"
						| "password";
					setError(fieldName, { message: e.message });
				});
			} else {
				setError("root.serverError", { message: result.error });
			}
			toast.error("Error when trying to register.")
		}
	};

	return (
		<Card className='w-2/5 mx-auto'>
			<CardHeader className="flex flex-col items-center justify-center">
				<div className="flex flex-col gap-2 items-center text-default">
					<div className="flex flex-row items-center gap-3">
						<GiPadlock size={30} />
						<h1 className="text-3xl font-semibold">
							Register
						</h1>
					</div>
					<p className="text-neutral-500">
						Welcome to Matcha
					</p>
				</div>
			</CardHeader>
			<CardBody>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<Input
							defaultValue=""
							label="Name"
							variant="bordered"
							{...register("name")}
							isInvalid={!!errors.name}
							errorMessage={errors.name?.message}
						/>
						<Input 
							defaultValue=""
							label="Email"
							variant="bordered"
							{...register("email")}
							isInvalid={!!errors.email}
							errorMessage={errors.email?.message}
						/>
						<Input
							defaultValue=""
							label="Password"
							variant="bordered"
							type='password'
							{...register("password")}
							isInvalid={!!errors.password}
							errorMessage={errors.password?.message}
						/>
						<Button
							isLoading={isSubmitting}
							isDisabled={!isValid}
							fullWidth
							color="default"
							type="submit"
						>
							Register
						</Button>
					</div>
				</form>
			</CardBody>
		</Card>
	);
}