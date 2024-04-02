import { Logs } from "@prisma/client"
import Link from "next/link"

const getLogs = async () => {
    const apiUrl = process.env.API_URL

    try{
        const res = await fetch(`${apiUrl}/api/logs`, {
            cache: 'no-store',
        })

        if(!res.ok){
            throw new Error('Failed to fetch logs')
        }

        return res.json()

    } catch(err){
        console.log(err)
    }
}


export default async function ListLogs(){

    let logs = await getLogs()

    if(!logs || !logs.logs || logs.logs.length === 0){
        return <div className="text-center">Nenhum registro encontrado...</div>
    }
    
    const firstLog = logs.logs[0]; // Pegando o primeiro registro

    return(
        <div>
            <div key={firstLog.id} className="border-b border-gray-100 py-2 text-center">
                <div>
                    <div className="text-xl font-semibold">A temperatura estava em {(new String(firstLog.grausTemp))}°C em: {(new Date(firstLog.horarioTempetura).toLocaleString("pt-BR"))}</div>
                </div>
                <div>
                    <div className="text-lg text-gray-500">Aerador foi ligado a última vez: {(new Date(firstLog.horarioAerador).toLocaleString("pt-BR"))}</div>
                    <div className="text-lg text-gray-500">Tratador foi ligado a última vez: {(new Date(firstLog.horarioTratador).toLocaleString("pt-BR"))}</div>
                </div>
            </div>
            <div className="text-center p-5">
                <Link href="/dashboard/listarLogs" className="text-md text-blue-400 hover:underline">
                    Conferir todos os registros ➡
                </Link>
            </div>
        </div>
    )
}
