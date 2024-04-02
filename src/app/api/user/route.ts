import prisma from "@/lib/db";
import { NextResponse } from "next/server"

export async function GET(req: Request){
    try{
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true
            }
        });

        return NextResponse.json({ users });
    } catch (error){
        console.error(error);
        return NextResponse.json({ message: "Erro ao buscar usuários" }, { status: 500 });
    }
}

export async function POST(req: Request){
    try{
        const body = await req.json();
        const { email, username, password } = body;

        //checar se o email existe
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email }
        });

        if(existingUserByEmail){
            return NextResponse.json({
                user: null,
                message: 'Email já cadastrado'
            }, { status: 409 });
        }

        //checar se o username existe
        const existingUserByUsername = await prisma.user.findUnique({
            where: { username }
        });

        if(existingUserByUsername){
            return NextResponse.json({
                user: null,
                message: 'Username já cadastrado'
            }, { status: 409 });
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password
            }
        });

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: 'Usuário criado com sucesso' }, { status: 201 });
    } catch (error){
        console.error(error);
        return NextResponse.json({ message: "Erro ao criar usuário" }, { status: 500 });
    }
}