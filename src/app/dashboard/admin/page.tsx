import TemperatureChart from '@/components/Charts'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

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
    console.log(err);
  }
};

const Admin = async () => {
  const session = await getServerSession(authOptions);

  let logs = await getLogs();

  if (!session?.user) {
    return (
      <div className='flex justify-center items-center flex-col h-full'>
        <h2 className='text-center text-red-500'>
          Acesso Negado, você precisa estar logado para acessar essa página!
        </h2>
        <Link href="/dashboard" className="text-blue-500 hover:underline p-5">
          Voltar
        </Link>
      </div>
    );
  }

  if (!logs || !logs.logs || logs.logs.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col h-full">
        Nenhum registro encontrado...
      </div>
    );
  }

  const firstLog = logs.logs[0];

  // Pegando apenas os primeiros 10 registros
  const firstTenLogs = logs.logs.slice(0, 10);

  const temperature = firstTenLogs.map((log: any) => log.grausTemp);
  const date = firstTenLogs.map((log: any) => new Date(log.horarioTemperatura).toLocaleDateString('pt-BR'));

  return (
    <div className='flex justify-center items-center flex-col h-full p-5'>
      <div className='text-2xl'>
        <h1>
          Bem vindo de volta, <b>{session?.user.username}!</b>
        </h1>
      </div>
      <div className='w-full text-center text-lg sm:text-xl'>
        <p>
          A temperatura da água no momento está em <b>{firstLog.grausTemp}</b> ºC
        </p>
        <p>
          Última vez que o Aerador foi ligado:{' '}
          <b>{new Date(new Date(firstLog.horarioAerador).getTime() - 3 * 60 * 60 * 1000).toLocaleString('pt-BR')}</b>
        </p>
        <p>
          Última vez que o Tratador foi ligado:{' '}
          <b>{new Date(new Date(firstLog.horarioTratador).getTime() - 3 * 60 * 60 * 1000).toLocaleString('pt-BR')}</b>
        </p>
        <div className="text-center p-5">
          <Link href="/dashboard/listarLogs" className="text-md text-blue-400 hover:underline">
            Conferir todos os registros ➡
          </Link>
        </div>
      </div>
      <TemperatureChart temperature={temperature} date={date} />
    </div>
  );
};

export default Admin;
