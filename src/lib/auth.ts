import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/sign-in",
    },
    providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email", placeholder: "email@exemplo.com" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            if(!credentials?.email && !credentials?.password){
                return null;
            }
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: credentials.email,
                    password: credentials.password
                }
            });

            if(!existingUser){
                return null;
            }

            const passwordMatch = await compare(credentials.password, existingUser.password);

            if(!passwordMatch){
                return null;
            }

            return {
                id: existingUser.id,
                email: existingUser.email,
                username: existingUser.username
            }
        }
    })
    ]
}