'use server';

import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { LoginSchema } from "@/lib/schemas/LoginSchema";
import { AuthError } from "next-auth";

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
	try {
		const result = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		});

		return { status: 'success', data: 'Logged in' }; 
	} catch (error) {
		if (error instanceof AuthError && error.type === 'CredentialsSignin') {
			return { status: 'error', error: 'Invalid credentials' };
		}
		return { status: 'error', error: 'Unexpected error je devieng fou' };
	}
}

export async function signOutUser() {
	await signOut({ redirectTo: '/' });
}

export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
	try {
		const validated = registerSchema.safeParse(data);

		if (!validated.success) {
			return { status: 'error', error: validated.error.errors };
		}

		const { name, email, password } = validated.data;
		const hashedPassword = await bcrypt.hash(password, 10);
	
		const existingUser = await prisma.user.findUnique({
			where: { email }
		});


		if (existingUser) {
			return { status: 'error', error: 'User already exists' };
		}
		

		const user = await prisma.user.create({
			data: {
				name,
				email,
				passwordHash: hashedPassword,
			}
		})

		await signIn('credentials', {
			email: email,
			password: password,
			redirect: false,
		});
		return { status: 'success', data: user };
	}	catch (error) {
		return { status: "error", error: "Something went wrong" };
	}
}

export async function getUserByEmail(email: string) {
	return prisma.user.findUnique({ where: { email }});
}

export async function getUserById(id: string) {
	return prisma.user.findUnique({ where: { id }});
}