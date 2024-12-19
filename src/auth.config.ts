import type { NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "./lib/schemas/LoginSchema";
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
	pages: {
		signIn: '/login',
	},
  providers: [
    GitHubProvider({
      id: "github-provider",
      name: "Github Provider",
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      id:"credentials",
      name:"Credentials",
      credentials:{
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
				if (!creds) {
					return null;
				}

        const result = loginSchema.safeParse(creds);
        if (!result.success) {
					return null;
				}
				const { email, password } = result.data;
				const user = await getUserByEmail(email);
				if (!user) {
					return null;
				}

				if (user.passwordHash) {
					const isValid = await compare(password, user.passwordHash);
					if (isValid) {
						const { passwordHash, ...userWithoutPassword } = user;
						return userWithoutPassword;
					}
				}
				return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

