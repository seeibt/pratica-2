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
                <div className="mt-16 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col">
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperatura</th>
                                                <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horário da Temperatura</th>
                                                <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Registro do Aerador</th>
                                                <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Registro do Tratador</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {logs.logs.map((log: Logs) => (
                                                <tr key={log.id}>
                                                    <td className="px-2 sm:px-4 py-4 text-sm text-gray-900">
                                                        {log?.grausTemp != null ? log.grausTemp.toString() : ''}°C
                                                    </td>
                                                    <td className="px-2 sm:px-4 py-4 text-sm text-gray-900">
                                                        {log?.horarioTemperatura != null ? new Date(new Date(log.horarioTemperatura).getTime() - 3 * 60 * 60 * 1000).toLocaleString("pt-BR") : ''}
                                                    </td>
                                                    <td className="px-2 sm:px-4 py-4 text-sm text-gray-900">
                                                        {log?.horarioAerador != null ? new Date(new Date(log.horarioAerador).getTime() - 3 * 60 * 60 * 1000).toLocaleString("pt-BR") : ''}
                                                    </td>
                                                    <td className="px-2 sm:px-4 py-4 text-sm text-gray-900">
                                                        {log?.horarioTratador != null ? new Date(new Date(log.horarioTratador).getTime() - 3 * 60 * 60 * 1000).toLocaleString("pt-BR") : ''}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
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
