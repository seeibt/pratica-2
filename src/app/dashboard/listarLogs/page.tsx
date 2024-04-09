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
    

    if(!logs){
        return <div className="text-center">Nenhum registro encontrado...</div>
    }
    
    const logComponent = logs.logs.map((log: Logs) => {
        return(
            <div key={log.id} className="border-b border-gray-100 py-2 text-center">
                <div>
                    <div className="text-lg font-semibold">A temperatura estava em {log?.grausTemp != null ? log.grausTemp.toString() : ''}°C em: {log?.horarioTemperatura != null ? new Date(log.horarioTemperatura).toLocaleString("pt-BR") : ''}</div>
                </div>
                <div>
                    <div className="text-sm text-gray-500">Aerador foi ligado a última vez: {log?.horarioAerador != null ? new Date(log.horarioAerador).toLocaleString("pt-BR") : ''}</div>
                    <div className="text-sm text-gray-500">Tratador foi ligado a última vez: {log?.horarioTratador != null ? new Date(log.horarioTratador).toLocaleString("pt-BR") : ''}</div>
                </div>
            </div>
        )
    })

    return(
        <div>
            {logComponent}
            <div className="text-center p-5">
                <Link href="/dashboard/admin" className="text-md text-blue-400 hover:underline">
                    Voltar ⬅
                </Link>
            </div>
        </div>
    )
}