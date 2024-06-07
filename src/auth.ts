import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "/assets/icons/cinemania-logo.png",
  },
  adapter: PrismaAdapter(prisma),
  providers: [Google, Github],
  trustHost: true,
});
