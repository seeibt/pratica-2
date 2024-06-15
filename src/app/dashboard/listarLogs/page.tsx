import { Logs } from "@prisma/client";
import Link from "next/link";

const getLogs = async () => {
    const apiUrl = process.env.API_URL;

    try {
        const res = await fetch(`${apiUrl}/api/logs`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch logs');
        }

        return res.json();
    } catch (err) {
        console.error('Error fetching logs:', err);
        return null; // or [] or any appropriate default value
    }
};

export default async function ListLogs() {
    try {
        const logs = await getLogs();

        if (!logs || !logs.logs) {
            return <div className="text-center mt-[navbar-height]">Nenhum registro encontrado...</div>;
        }

        return (
            <>
                <div className="mt-16">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperatura</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horário da Temperatura</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Registro do Aerador</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Registro do Tratador</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {logs.logs.map((log: Logs) => (
                                <tr key={log.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {log?.grausTemp != null ? log.grausTemp.toString() : ''}°C
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {log?.horarioTemperatura != null ? new Date(new Date(log.horarioTemperatura).getTime()).toLocaleString("pt-BR") : ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {log?.horarioAerador != null ? new Date(new Date(log.horarioAerador).getTime()).toLocaleString("pt-BR") : ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {log?.horarioTratador != null ? new Date(new Date(log.horarioTratador).getTime()).toLocaleString("pt-BR") : ''}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-center p-5">
                        <Link href="/dashboard/admin" className="text-md text-blue-400 hover:underline">
                            Voltar ⬅
                        </Link>
                    </div>
                </div>
            </>
        );
    } catch (error) {
        console.error('Error rendering logs:', error);
        return <div className="text-center mt-[navbar-height]">Erro ao carregar registros...</div>;
    }
}
