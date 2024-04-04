import prisma from "@/lib/db";
import { NextResponse } from "next/server"

export async function GET(req: Request){
    try{
        const logs = await prisma.logs.findMany({
            orderBy: {
                horarioTemperatura: "desc",
            },
        });

        return NextResponse.json({ logs });
    } catch (error){
        console.error(error);
        return NextResponse.json({ message: "Erro ao buscar logs" }, { status: 500 });
    }
}

// export async function POST(req: Request){
//     try{
//         const { horarioTemperatura, grausTemp, horarioAerador, horarioTratador  } = await req.json();

//         const lastLog = await prisma.logs.findFirst({
//             orderBy: {
//                 horarioTemperatura: "desc",
//             },
//         });

//         const log = await prisma.logs.create({
//             data: {
//                 horarioTemperatura: ((horarioTemperatura) > 0 ? new Date().toISOString() : lastLog?.horarioTemperatura) as Date,
//                 grausTemp,
//                 horarioAerador: ((horarioAerador) > 0 ? new Date().toISOString() : lastLog?.horarioAerador) as Date,
//                 horarioTratador: ((horarioTratador) > 0 ? new Date().toISOString() : lastLog?.horarioTratador) as Date,
//             },
//         });

//         return NextResponse.json({ log });
//     } catch (error){
//         console.error(error);
//         return NextResponse.json({ message: "Erro ao criar log" }, { status: 500 });
//     }
// }