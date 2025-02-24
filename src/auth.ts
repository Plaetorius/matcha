import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token }) {
        return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
  // adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
