import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
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

            return {
                id: existingUser.id,
                email: existingUser.email,
                username: existingUser.username
            }
        }
    })
    ],
    callbacks: {
        async jwt({token, user }) {
            if(user){
                return { 
                    ...token,
                    username: user.username
                };
            }
            return token
        },
        async session({session, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username
                }
            }
        }
    }
}