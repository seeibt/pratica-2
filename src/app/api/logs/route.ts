import prisma from "@/lib/db";
import { NextResponse } from "next/server"

export async function GET(req: Request){
    try{
        const logs = await prisma.logs.findMany({
            orderBy: {
                horarioTempetura: "desc",
            },
        });

        return NextResponse.json({ logs });
    } catch (error){
        console.error(error);
        return NextResponse.json({ message: "Erro ao buscar logs" }, { status: 500 });
    }
}